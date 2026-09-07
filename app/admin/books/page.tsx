"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  Layers,
  Users,
  CheckCircle,
  Plus,
  Download,
  RefreshCw,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import BooksToolbar from "@/components/admin/books/BooksToolbar";
import BooksTable from "@/components/admin/books/BooksTable";
import BookActionsModal from "@/components/admin/books/BookActionsModal";
import { BookItemData } from "@/components/admin/books/BookRow";

export default function AdminBooksPage() {
  const [books, setBooks] = useState<BookItemData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCategories: 0,
    totalAuthors: 0,
    inStockBooks: 0,
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const hasAutoSyncedRef = React.useRef(false);

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | "delete" | null>(null);
  const [activeBook, setActiveBook] = useState<BookItemData | null>(null);

  // Fetch Books Data from Real API
  const fetchBooks = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(pageSize));
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedAuthor) params.set("author", selectedAuthor);
      if (selectedStatus) params.set("availability", selectedStatus);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const json = await res.json();
      if (json.data) {
        setBooks(json.data);
        if (json.meta) {
          setTotalCount(json.meta.total);
          setTotalPages(json.meta.totalPages || 1);

          // Auto-sync only if database is completely empty (0 books)
          if (
            json.meta.total === 0 &&
            !hasAutoSyncedRef.current &&
            !searchQuery &&
            !selectedCategory &&
            !selectedAuthor &&
            !selectedStatus
          ) {
            hasAutoSyncedRef.current = true;
            fetch("/api/products/sync", { method: "POST" })
              .then((r) => r.json())
              .then((s) => {
                if (s.success) {
                  fetchBooks();
                  fetchMetaStats();
                }
              })
              .catch(() => {});
          }
        }
      }
    } catch (err) {
      console.error("Error loading books:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [page, pageSize, searchQuery, selectedCategory, selectedAuthor, selectedStatus]);

  // Fetch Meta Stats & Filter options (Categories / Authors)
  const fetchMetaStats = async () => {
    try {
      const [allProductsRes, categoriesRes] = await Promise.all([
        fetch("/api/products?limit=100"),
        fetch("/api/categories"),
      ]);

      if (allProductsRes.ok) {
        const prodJson = await allProductsRes.json();
        const allProds: BookItemData[] = prodJson.data || [];

        const uniqueAuthors = Array.from(new Set(allProds.map((p) => p.author))).filter(Boolean);
        setAuthors(uniqueAuthors);

        const inStockCount = allProds.filter(
          (p) => p.availability === "in-stock" && (p.stock ?? 1) > 0
        ).length;

        setStats((prev) => ({
          ...prev,
          totalBooks: prodJson.meta?.total || allProds.length,
          totalAuthors: uniqueAuthors.length,
          inStockBooks: inStockCount,
        }));
      }

      if (categoriesRes.ok) {
        const catJson = await categoriesRes.json();
        const catNames = (catJson.data || []).map((c: any) => c.name);
        setCategories(catNames);
        setStats((prev) => ({
          ...prev,
          totalCategories: catNames.length,
        }));
      }
    } catch (e) {
      console.error("Error loading metadata:", e);
    }
  };

  useEffect(() => {
    fetchMetaStats();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === books.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(books.map((b) => b.id));
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedAuthor("");
    setSelectedStatus("");
    setPage(1);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (books.length === 0) return;
    const headers = ["Title", "Author", "Category", "Price", "Stock", "Availability"];
    const csvRows = [
      headers.join(","),
      ...books.map((b) =>
        [
          `"${b.title.replace(/"/g, '""')}"`,
          `"${b.author.replace(/"/g, '""')}"`,
          `"${b.category.replace(/"/g, '""')}"`,
          `"${b.price}"`,
          b.stock,
          b.availability,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `publishinghub-books-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Bulk Delete Handler
  const handleBulkDelete = async (idsToDelete: string[]) => {
    if (!idsToDelete.length) return;
    const confirmMsg =
      idsToDelete.length === 1
        ? "Are you sure you want to delete this book?"
        : `Are you sure you want to delete ${idsToDelete.length} selected books? This action cannot be undone.`;

    if (!window.confirm(confirmMsg)) return;

    try {
      setIsLoading(true);
      await Promise.all(
        idsToDelete.map((id) =>
          fetch(`/api/products/${id}`, { method: "DELETE" })
        )
      );
      setSelectedIds([]);
      await fetchBooks();
      await fetchMetaStats();
    } catch (err) {
      console.error("Failed to delete selected books:", err);
      alert("Failed to delete some or all selected books.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Reorder Books (Drag and drop or Move Up/Down)
  const handleReorder = async (fromIndex: number, toIndex: number) => {
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= books.length ||
      toIndex >= books.length
    ) {
      return;
    }

    // Optimistically update UI
    const updatedBooks = [...books];
    const [movedBook] = updatedBooks.splice(fromIndex, 1);
    updatedBooks.splice(toIndex, 0, movedBook);
    setBooks(updatedBooks);

    try {
      const ids = updatedBooks.map((b) => b.id);
      const startIndex = (page - 1) * (pageSize >= 1000 ? 0 : pageSize);
      const res = await fetch("/api/products/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, startIndex }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        console.error("Failed to persist book order:", errJson);
        fetchBooks();
      }
    } catch (err) {
      console.error("Error saving book order:", err);
      fetchBooks();
    }
  };

  // Handle Page Size Change (e.g. 10, 25, 50, or All)
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  // Sync Live Books Handler
  const handleSyncLiveBooks = async () => {
    try {
      setIsSyncing(true);
      const res = await fetch("/api/products/sync", { method: "POST" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to sync live books");
      }
      await fetchBooks();
      await fetchMetaStats();
      alert(`Success! ${json.message || "All live books have been synced to the database."}`);
    } catch (err: any) {
      console.error("Sync error:", err);
      alert(err.message || "Failed to sync live books.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] sm:text-[32px] font-semibold admin-text-primary tracking-tight">
            Books
          </h1>
          <p className="text-[13px] admin-text-secondary mt-0.5">
            Manage and organize all your books in one place.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={fetchBooks}
            disabled={isRefreshing}
            aria-label="Refresh Books"
            className="p-2 admin-card rounded-xl text-gray-500 hover:text-[#8B5CF6] transition-colors cursor-pointer shadow-sm"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#8B5CF6]" : ""}`} />
          </button>

          <button
            onClick={handleSyncLiveBooks}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 admin-card text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
            title="Import/Sync all live website books into backend database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing Books..." : "Sync Live Books"}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 admin-card text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={() => {
              setActiveBook(null);
              setModalMode("add");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={BookOpen}
          growth="Active"
          comparisonText="catalog titles"
          isLoading={isLoading}
        />
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          icon={Layers}
          growth="Organized"
          comparisonText="literary genres"
          isLoading={isLoading}
        />
        <StatCard
          title="Authors"
          value={stats.totalAuthors}
          icon={Users}
          growth="Creators"
          comparisonText="published writers"
          isLoading={isLoading}
        />
        <StatCard
          title="In Stock Titles"
          value={stats.inStockBooks}
          icon={CheckCircle}
          growth="Ready"
          comparisonText="for fulfillment"
          isLoading={isLoading}
        />
      </div>

      {/* Filter Toolbar */}
      <BooksToolbar
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setPage(1);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(val) => {
          setSelectedCategory(val);
          setPage(1);
        }}
        selectedAuthor={selectedAuthor}
        onAuthorChange={(val) => {
          setSelectedAuthor(val);
          setPage(1);
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(val) => {
          setSelectedStatus(val);
          setPage(1);
        }}
        categories={categories}
        authors={authors}
        onReset={handleResetFilters}
        totalFiltered={totalCount}
      />

      {/* Books Management Table */}
      <BooksTable
        books={books}
        isLoading={isLoading}
        isFiltered={Boolean(searchQuery || selectedCategory || selectedAuthor || selectedStatus)}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onSelectAll={handleSelectAll}
        onView={(b) => {
          setActiveBook(b);
          setModalMode("view");
        }}
        onEdit={(b) => {
          setActiveBook(b);
          setModalMode("edit");
        }}
        onDelete={(b) => {
          setActiveBook(b);
          setModalMode("delete");
        }}
        onBulkDelete={handleBulkDelete}
        onAddNew={() => {
          setActiveBook(null);
          setModalMode("add");
        }}
        onResetFilters={handleResetFilters}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={handlePageSizeChange}
        onReorder={handleReorder}
      />

      {/* Action Modals (View, Add, Edit, Delete) */}
      <BookActionsModal
        mode={modalMode}
        book={activeBook}
        categories={categories}
        onClose={() => {
          setModalMode(null);
          setActiveBook(null);
        }}
        onSuccess={() => {
          fetchBooks();
          fetchMetaStats();
        }}
      />
    </div>
  );
}

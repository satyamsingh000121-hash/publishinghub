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
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
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

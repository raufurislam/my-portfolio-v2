import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RefreshCw,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllUsers } from "@/actions/user";
import CustomPagination from "@/components/shared/CustomPagination";
import UrlSearchInput from "@/components/shared/UrlSearchInput";
import UrlPerPageSelect from "@/components/shared/UrlPerPageSelect";

type SearchParams = {
  searchTerm?: string;
  role?: string;
  isActive?: string;
  page?: string;
  limit?: string;
};

export default async function ManageUsers({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = Number(searchParams?.page || 1);
  const limit = Number(searchParams?.limit || 10);
  const role = (searchParams?.role as string) || "all";
  const isActive = (searchParams?.isActive as string) || "all";
  const sort = (searchParams as any)?.sort as string | undefined;
  const searchTerm = (searchParams?.searchTerm as string) || "";

  const res = await getAllUsers({
    page,
    limit,
    role,
    isActive,
    searchTerm,
    sort,
  });
  const users = res?.data || [];
  const meta = res?.meta || { page, limit, totalPage: 1, total: users.length };

  // Build safe refresh href from known primitives
  const refreshParams = new URLSearchParams();
  if (searchTerm) refreshParams.set("searchTerm", searchTerm);
  if (role) refreshParams.set("role", role);
  if (isActive) refreshParams.set("isActive", isActive);
  refreshParams.set("page", String(page));
  refreshParams.set("limit", String(limit));
  const refreshHref = `?${refreshParams.toString()}`;

  // Created sort helpers
  const currentSort = sort || "";
  const sortDir =
    currentSort === "createdAt"
      ? "asc"
      : currentSort === "-createdAt"
      ? "desc"
      : undefined;
  const sortParams = new URLSearchParams();
  if (searchTerm) sortParams.set("searchTerm", searchTerm);
  sortParams.set("limit", String(limit));
  sortParams.set("page", String(page));
  sortParams.set("sort", sortDir === "desc" ? "createdAt" : "-createdAt");
  const createdSortHref = `?${sortParams.toString()}`;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">
            View and manage all registered users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={refreshHref}>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </Link>
          <Link href="?">
            <Button variant="outline">Clear Filters</Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Search (debounced, URL-driven) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <UrlSearchInput
                  placeholder="Search by name or email..."
                  defaultValue={searchTerm}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Per page */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Per page</label>
              <UrlPerPageSelect defaultLimit={limit} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Providers</th>
                  <th className="px-4 py-3">
                    <Link
                      href={createdSortHref}
                      className="inline-flex items-center gap-1"
                    >
                      Created
                      {sortDir === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : sortDir === "desc" ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name || user.email}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold uppercase">
                          {(user.name || user.email || "U").slice(0, 1)}
                        </div>
                      )}
                      <span className="font-medium">
                        {user.name || "Unnamed"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm">{user.role}</td>
                    <td className="px-4 py-3 text-sm space-x-1">
                      {(user.auths || []).map((a: any) => (
                        <span
                          key={a.provider}
                          className="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs capitalize"
                        >
                          {a.provider}
                        </span>
                      ))}
                    </td>

                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <CustomPagination
        currentPage={meta.page}
        totalPages={meta.totalPage || 1}
      />
    </div>
  );
}

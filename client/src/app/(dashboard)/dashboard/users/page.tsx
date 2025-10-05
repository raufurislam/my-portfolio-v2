"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { getAllUsers } from "@/actions/user";

export default async function ManageUsers() {
  const res = await getAllUsers();
    const users = res?.data;
  console.log(res);

 /*
  [
    {
        "_id": "68e21251aec0bce97e1a3fb4",
        "name": "Hillary Estes",
        "email": "jely@mailinator.com",
        "password": "$2b$10$5jsornj92IWpE7eiKz/5rO/TwTDdSzWInZ0bM6.VQnuj45CfbEgFW",
        "role": "USER",
        "auths": [
            {
                "provider": "credentials",
                "providerId": "jely@mailinator.com"
            }
        ],
        "createdAt": "2025-10-05T06:38:09.743Z",
        "updatedAt": "2025-10-05T06:38:09.743Z"
    },
    {
        "_id": "68e13c978618e04175d0ab52",
        "name": "Ulla Graves",
        "email": "lenuh@mailinator.com",
        "password": "$2b$10$pPEwTEWPYMMLiZt5KiWOMOgDHhVsIgXqW8HXsToS4peHPM//xTcfC",
        "role": "USER",
        "auths": [
            {
                "provider": "credentials",
                "providerId": "lenuh@mailinator.com"
            }
        ],
        "createdAt": "2025-10-04T15:26:15.974Z",
        "updatedAt": "2025-10-04T15:26:15.974Z"
    },
    {
        "_id": "68d95a0f841507db5021961f",
        "name": "raufur islam",
        "email": "raufurislam@gmail.com",
        "role": "USER",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocIH8E6QTagoPt5JNg-1G23BdRd_vhGzSzB1CCID3mZk_x5Bx1ew=s96-c",
        "auths": [
            {
                "provider": "google",
                "providerId": "108037396370050215156"
            },
            {
                "provider": "credentials",
                "providerId": "raufurislam@gmail.com"
            }
        ],
        "createdAt": "2025-09-28T15:53:51.402Z",
        "updatedAt": "2025-09-28T16:05:43.329Z",
        "password": "$2b$10$MaymIzcDsqYEv0JdUz0GlO0MpvYq0.iPJVXJdGhEx9.SPhKE17X4W"
    },
    {
        "_id": "68d9598fc448dc0160680d64",
        "name": "Super admin",
        "email": "super@gmail.com",
        "password": "$2b$10$9j2LD3UAhJzvA0KC3.dD7.o9bk0vxIMFN43bK2/PDnvqZeRvm7n6q",
        "role": "SUPER_ADMIN",
        "auths": [
            {
                "provider": "credentials",
                "providerId": "super@gmail.com"
            }
        ],
        "createdAt": "2025-09-28T15:51:43.919Z",
        "updatedAt": "2025-09-28T15:51:43.919Z"
    }
]
  */ 

  // --- DEMO DATA ---
  const demoUsers = [
    {
      _id: "1",
      name: "Raufur Islam",
      email: "raufurislam@gmail.com",
      role: "USER",
      isActive: "ACTIVE",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocIH8E6QTagoPt5JNg-1G23BdRd_vh",
      auths: [{ provider: "google" }, { provider: "credentials" }],
      createdAt: "2025-09-28T15:53:51.402Z",
    },
    {
      _id: "2",
      name: "Ulla Graves",
      email: "ulla@mailinator.com",
      role: "ADMIN",
      isActive: "INACTIVE",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Ulla%20Graves",
      auths: [{ provider: "credentials" }],
      createdAt: "2025-09-25T08:30:00Z",
    },
  ];

  // --- FILTER STATE ---
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    isActive: "all",
    page: 1,
    limit: 10,
  });

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "all",
      isActive: "all",
      page: 1,
      limit: 10,
    });
  };

  const handlePageChange = (nextPage: number) =>
    setFilters((f) => ({ ...f, page: nextPage }));

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
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
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
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select
                value={filters.role}
                onValueChange={(value) =>
                  setFilters((f) => ({ ...f, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.isActive}
                onValueChange={(value) =>
                  setFilters((f) => ({ ...f, isActive: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="font-medium">{user.name}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm">{user.role}</td>
                    <td className="px-4 py-3 text-sm space-x-1">
                      {user.auths.map((a) => (
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
        {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

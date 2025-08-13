// Save as: src/app/(dashboard)/exercises/page.tsx
// Notes:
// - Matches IronForge dashboard look & feel: shadcn/ui + Tailwind (dark), lucide-react icons.
// - Uses mock data and client-side filtering/sorting. Wire up to Supabase later.
// - Row action menu (⋯) includes: Edit, Duplicate, Move data to another exercise, Delete.
// - Provides placeholder handlers you can connect to modals/sheets or routes.

'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Filter, Plus, Search } from 'lucide-react'

// --- Types & Mock Data ------------------------------------------------------

type Exercise = {
  id: string
  name: string
  muscles: string[]
  workoutsCount: number
  icon?: string // emoji string
}

const MOCK: Exercise[] = [
  { id: 'ex-1', name: '1/2 Kneeling Kettlebell Chop', muscles: ['Abs'], workoutsCount: 4, icon: '🏋️‍♂️' },
  { id: 'ex-2', name: 'Air Squat', muscles: ['Posterior thighs', 'Glutes', 'Quads'], workoutsCount: 0, icon: '🏋️‍♂️' },
  { id: 'ex-3', name: 'Arm Across Chest Stretch', muscles: ['Shoulders'], workoutsCount: 0, icon: '🧘' },
  { id: 'ex-4', name: 'Arm Circles', muscles: ['Shoulders'], workoutsCount: 0, icon: '🌀' },
  { id: 'ex-5', name: 'Arm Over Arm', muscles: ['Biceps', 'Back'], workoutsCount: 0, icon: '💪' },
  { id: 'ex-6', name: 'Arnold Press', muscles: ['Shoulders'], workoutsCount: 17, icon: '💪' },
  { id: 'ex-7', name: 'Assisted Pull-Up', muscles: ['Back'], workoutsCount: 12, icon: '🏋️' },
]

// --- Utilities ---------------------------------------------------------------

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// --- Add / Edit Exercise Sheet (placeholder) --------------------------------

function ExerciseSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-foreground">Add exercise</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Name</label>
            <Input placeholder="e.g., Barbell Bench Press" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Primary muscle groups (comma separated)</label>
            <Input placeholder="Chest, Triceps, Shoulders" />
          </div>
          <div className="pt-2">
            <button className="w-full border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">Create exercise</button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// --- Page -------------------------------------------------------------------

export default function ExercisesPage() {
  const [query, setQuery] = React.useState('')
  const [data, setData] = React.useState<Exercise[]>(MOCK)
  const [sortAsc, setSortAsc] = React.useState(true)
  const [openSheet, setOpenSheet] = React.useState(false)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    let rows = !q
      ? data
      : data.filter((ex) =>
          [ex.name, ex.muscles.join(','), String(ex.workoutsCount)]
            .join(' ')
            .toLowerCase()
            .includes(q)
        )
    rows = [...rows].sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    return rows
  }, [data, query, sortAsc])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl">Exercises</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => console.log('filter-open')}
                className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button
                onClick={() => setOpenSheet(true)}
                className="flex items-center gap-2 border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                <Plus className="h-4 w-4" />
                <span>Add exercise</span>
              </button>
            </div>
          </CardTitle>
          <div className="mt-3 flex items-center gap-2">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search exercises"
                className="pl-9"
              />
            </div>
            <button
              onClick={() => setQuery('')}
              className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="overflow-hidden rounded-lg border bg-card">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-[40%] cursor-pointer select-none" onClick={() => setSortAsc((s) => !s)}>
                    <div className="flex items-center gap-1">
                      Name
                      <span className="text-xs text-muted-foreground">{sortAsc ? '↑' : '↓'}</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[15%]">Workouts</TableHead>
                  <TableHead>Muscle groups</TableHead>
                  <TableHead className="w-[52px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((ex) => (
                  <TableRow key={ex.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{ex.icon ?? '🏋️'}</span>
                        <span className="font-medium text-foreground">{ex.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{ex.workoutsCount}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {ex.muscles.map((m) => (
                          <Badge key={m} variant="secondary" className="rounded-full">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions
                        onEdit={() => console.log('edit', ex.id)}
                        onDuplicate={() => console.log('duplicate', ex.id)}
                        onMoveData={() => console.log('move-data', ex.id)}
                        onDelete={() => {
                          console.log('delete', ex.id)
                          setData((prev) => prev.filter((p) => p.id !== ex.id))
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                      No exercises match your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Exercise Sheet */}
      <ExerciseSheet open={openSheet} onOpenChange={setOpenSheet} />
    </div>
  )
}

// --- Row Actions (⋯) --------------------------------------------------------

function RowActions({
  onEdit,
  onDuplicate,
  onMoveData,
  onDelete,
}: {
  onEdit: () => void
  onDuplicate: () => void
  onMoveData: () => void
  onDelete: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
          aria-label="More"
        >
          <DotsVerticalIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem onClick={onMoveData}>Move data to another exercise</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

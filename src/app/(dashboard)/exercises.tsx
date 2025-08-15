'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, FilterIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { ExerciseFilters } from '@/components/exercises/ExerciseFilters';
import { useExercises } from '@/hooks/useExercises';
import { ExerciseFilters as IExerciseFilters, Exercise, getDifficultyLevel, formatMuscleGroups } from '@/types/exercises';

export default function ExercisesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<IExerciseFilters>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'difficulty_level'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const {
    data: exerciseData,
    isLoading,
    error,
    refetch
  } = useExercises({
    search,
    ...filters,
    sortBy,
    sortDirection,
    page: 1,
    limit: 100
  });

  // Apply filters with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, filters, sortBy, sortDirection, refetch]);

  const handleFiltersChange = (newFilters: IExerciseFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch('');
  };

  const handleSort = (field: 'name' | 'difficulty_level') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (exercise: Exercise) => {
    router.push(`/exercises/${exercise.id}`);
  };

  const activeFilterCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return true;
    return value !== undefined && value !== null;
  }).length;

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Exercises</CardTitle>
            <CardDescription>
              Unable to load exercise database. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl">Exercises</span>
            <div className="flex items-center gap-2">
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Exercise Filters</DialogTitle>
                    <DialogDescription>
                      Filter exercises by category, equipment, muscle groups, and more.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto px-1">
                    <ExerciseFilters
                      filters={filters}
                      onChange={handleFiltersChange}
                      categories={exerciseData?.categories || []}
                      equipment={exerciseData?.equipment || []}
                    />
                  </div>
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="flex-1"
                    >
                      Clear All
                    </Button>
                    <Button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
          
          <div className="mt-3 flex items-center gap-2">
            <div className="relative w-full max-w-xl">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises by name or description..."
                className="pl-9"
              />
            </div>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="px-3 py-2"
            >
              Clear
            </Button>
          </div>

          {/* Active Filters Display */}
          {(search || activeFilterCount > 0) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {search && (
                <Badge variant="secondary" className="px-2 py-1">
                  Search: "{search}"
                  <button
                    onClick={() => setSearch('')}
                    className="ml-2 hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.categories?.map(category => (
                <Badge key={category} variant="secondary" className="px-2 py-1">
                  {category}
                  <button
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      categories: prev.categories?.filter(c => c !== category)
                    }))}
                    className="ml-2 hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {filters.equipment?.map(equipment => (
                <Badge key={equipment} variant="secondary" className="px-2 py-1">
                  {equipment}
                  <button
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      equipment: prev.equipment?.filter(e => e !== equipment)
                    }))}
                    className="ml-2 hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-3">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                'Loading exercises...'
              ) : (
                `Showing ${exerciseData?.exercises?.length || 0} of ${exerciseData?.total || 0} exercises`
              )}
            </p>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : exerciseData?.exercises?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No exercises found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {search || activeFilterCount > 0
                  ? "Try adjusting your search terms or filters."
                  : "No exercises are currently available."}
              </p>
              {(search || activeFilterCount > 0) && (
                <Button onClick={clearFilters} variant="outline">
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border bg-card">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-card">
                  <TableRow>
                    <TableHead 
                      className="w-[35%] cursor-pointer select-none hover:bg-muted/50" 
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortBy === 'name' && (
                          sortDirection === 'asc' ? 
                            <ChevronUpIcon className="h-4 w-4" /> : 
                            <ChevronDownIcon className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="w-[15%] cursor-pointer select-none hover:bg-muted/50"
                      onClick={() => handleSort('difficulty_level')}
                    >
                      <div className="flex items-center gap-1">
                        Difficulty
                        {sortBy === 'difficulty_level' && (
                          sortDirection === 'asc' ? 
                            <ChevronUpIcon className="h-4 w-4" /> : 
                            <ChevronDownIcon className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="w-[20%]">Equipment</TableHead>
                    <TableHead>Muscle Groups</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exerciseData?.exercises?.map((exercise) => (
                    <TableRow 
                      key={exercise.id} 
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleRowClick(exercise)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="text-lg">💪</div>
                          <div>
                            <div className="font-medium text-foreground">{exercise.name}</div>
                            <div className="text-sm text-muted-foreground capitalize">
                              {exercise.default_equipment?.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {exercise.difficulty_level && (
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: getDifficultyLevel(exercise.difficulty_level).color }}
                            />
                            <span className="text-sm">{getDifficultyLevel(exercise.difficulty_level).label}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {exercise.available_equipment?.slice(0, 2).map((equipment) => (
                            <Badge key={equipment} variant="outline" className="text-xs">
                              {equipment.replace('_', ' ')}
                            </Badge>
                          ))}
                          {exercise.available_equipment && exercise.available_equipment.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{exercise.available_equipment.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {exercise.primary_muscles?.slice(0, 3).map((muscle) => (
                            <Badge key={muscle} variant="secondary" className="text-xs">
                              {formatMuscleGroups([muscle])}
                            </Badge>
                          ))}
                          {exercise.primary_muscles && exercise.primary_muscles.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{exercise.primary_muscles.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

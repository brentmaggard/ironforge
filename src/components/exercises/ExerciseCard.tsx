// src/components/exercises/ExerciseCard.tsx
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Exercise, getDifficultyLevel, getSafetyRating, formatMuscleGroups } from '@/types/exercises';
import { DumbbellIcon, HeartIcon, StarIcon, UserIcon, AlertTriangleIcon } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect?: (exercise: Exercise) => void;
  showSelectButton?: boolean;
}

export function ExerciseCard({ exercise, onSelect, showSelectButton = false }: ExerciseCardProps) {
  const router = useRouter();
  const difficultyLevel = getDifficultyLevel(exercise.difficulty_level);
  const safetyRating = getSafetyRating(exercise.safety_rating);

  const handleSelectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect?.(exercise);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/exercises/${exercise.id}`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{exercise.name}</CardTitle>
            <CardDescription className="mt-1">
              {exercise.default_equipment && (
                <span className="capitalize">{exercise.default_equipment.replace('_', ' ')}</span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 ml-2">
            {exercise.is_compound && (
              <Badge variant="secondary" className="text-xs">
                Compound
              </Badge>
            )}
            {exercise.requires_spotter && (
              <Badge variant="destructive" className="text-xs">
                <UserIcon className="h-3 w-3 mr-1" />
                Spotter
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Muscle Groups */}
        {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <DumbbellIcon className="h-4 w-4 mr-2" />
              Primary Muscles
            </h4>
            <div className="flex flex-wrap gap-1">
              {exercise.primary_muscles.slice(0, 3).map((muscle) => (
                <Badge key={muscle} variant="outline" className="text-xs">
                  {formatMuscleGroups([muscle])}
                </Badge>
              ))}
              {exercise.primary_muscles.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{exercise.primary_muscles.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Equipment */}
        {exercise.available_equipment && exercise.available_equipment.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Equipment</h4>
            <div className="flex flex-wrap gap-1">
              {exercise.available_equipment.slice(0, 2).map((equipment) => (
                <Badge key={equipment} variant="outline" className="text-xs">
                  {equipment.replace('_', ' ')}
                </Badge>
              ))}
              {exercise.available_equipment.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{exercise.available_equipment.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Difficulty and Safety */}
        <div className="flex items-center justify-between text-sm">
          {exercise.difficulty_level && (
            <div className="flex items-center gap-1">
              <StarIcon className="h-4 w-4" style={{ color: difficultyLevel.color }} />
              <span className="font-medium">{difficultyLevel.label}</span>
            </div>
          )}
          {exercise.safety_rating && (
            <div className="flex items-center gap-1">
              <AlertTriangleIcon className="h-4 w-4" style={{ color: safetyRating.color }} />
              <span className="text-xs text-muted-foreground">{safetyRating.label}</span>
            </div>
          )}
        </div>

        {/* Description Preview */}
        {exercise.description && (
          <div className="text-sm text-muted-foreground line-clamp-3">
            {exercise.description.replace(/##\s+/g, '').replace(/\n/g, ' ').substring(0, 120)}
            {exercise.description.length > 120 && '...'}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button onClick={handleViewDetails} variant="outline" className="flex-1" size="sm">
            View Details
          </Button>
          {showSelectButton && onSelect && (
            <Button onClick={handleSelectClick} className="flex-1" size="sm">
              Select
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
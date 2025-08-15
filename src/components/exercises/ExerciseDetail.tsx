// src/components/exercises/ExerciseDetail.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Exercise, getDifficultyLevel, getSafetyRating, formatMuscleGroups } from '@/types/exercises';
import { 
  DumbbellIcon, 
  HeartIcon, 
  StarIcon, 
  UserIcon, 
  AlertTriangleIcon,
  WeightIcon,
  TargetIcon,
  InfoIcon
} from 'lucide-react';

interface ExerciseDetailProps {
  exercise: Exercise | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (exercise: Exercise) => void;
  showSelectButton?: boolean;
}

export function ExerciseDetail({ 
  exercise, 
  open, 
  onOpenChange, 
  onSelect,
  showSelectButton = false 
}: ExerciseDetailProps) {
  if (!exercise) return null;

  const difficultyLevel = getDifficultyLevel(exercise.difficulty_level);
  const safetyRating = getSafetyRating(exercise.safety_rating);

  const handleSelectClick = () => {
    onSelect?.(exercise);
    onOpenChange(false);
  };

  const renderDescription = (description: string) => {
    return description
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return (
            <h4 key={index} className="font-semibold mt-4 mb-2 text-base">
              {line.replace('## ', '')}
            </h4>
          );
        } else if (line.match(/^\d+\./)) {
          return (
            <div key={index} className="ml-4 mb-1 text-sm">
              {line}
            </div>
          );
        } else if (line.startsWith('- ')) {
          return (
            <div key={index} className="ml-4 mb-1 text-sm">
              • {line.replace('- ', '')}
            </div>
          );
        } else if (line.trim() === '') {
          return <div key={index} className="h-2" />;
        } else {
          return (
            <p key={index} className="mb-2 text-sm">
              {line}
            </p>
          );
        }
      });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col max-h-screen overflow-hidden">
        {/* Header - Fixed */}
        <SheetHeader className="flex-shrink-0 pb-2">
          <SheetTitle className="text-xl">{exercise.name}</SheetTitle>
          <SheetDescription>
            {exercise.default_equipment && (
              <span className="capitalize">{exercise.default_equipment.replace('_', ' ')} exercise</span>
            )}
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              {exercise.difficulty_level && (
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="h-4 w-4" style={{ color: difficultyLevel.color }} />
                      <div>
                        <p className="text-xs font-medium">Difficulty</p>
                        <p className="text-xs text-muted-foreground">{difficultyLevel.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {exercise.safety_rating && (
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangleIcon className="h-4 w-4" style={{ color: safetyRating.color }} />
                      <div>
                        <p className="text-xs font-medium">Safety</p>
                        <p className="text-xs text-muted-foreground">{safetyRating.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Exercise Attributes */}
            <div className="flex flex-wrap gap-2">
              {exercise.is_compound && (
                <Badge variant="default" className="text-xs">
                  <TargetIcon className="h-3 w-3 mr-1" />
                  Compound
                </Badge>
              )}
              {exercise.is_unilateral && (
                <Badge variant="secondary" className="text-xs">
                  Unilateral
                </Badge>
              )}
              {exercise.requires_spotter && (
                <Badge variant="destructive" className="text-xs">
                  <UserIcon className="h-3 w-3 mr-1" />
                  Requires Spotter
                </Badge>
              )}
            </div>

            <Separator />

            {/* Starting Weights */}
            {(exercise.starting_weight_lbs || exercise.starting_weight_kg) && (
              <>
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center">
                    <WeightIcon className="h-4 w-4 mr-2" />
                    Suggested Starting Weights
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {exercise.starting_weight_lbs && (
                      <Card>
                        <CardContent className="p-2">
                          <p className="text-xs font-medium">Imperial</p>
                          <p className="text-base font-bold">{exercise.starting_weight_lbs} lbs</p>
                          {exercise.default_warmup_weight && (
                            <p className="text-xs text-muted-foreground">
                              Warmup: {exercise.default_warmup_weight} lbs
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )}
                    {exercise.starting_weight_kg && (
                      <Card>
                        <CardContent className="p-2">
                          <p className="text-xs font-medium">Metric</p>
                          <p className="text-base font-bold">{exercise.starting_weight_kg} kg</p>
                          {exercise.default_warmup_weight && (
                            <p className="text-xs text-muted-foreground">
                              Warmup: {Math.round(exercise.default_warmup_weight * 0.453592)} kg
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Muscle Groups */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <DumbbellIcon className="h-4 w-4 mr-2" />
                Target Muscles
              </h3>
              <div className="space-y-2">
                {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium mb-1">Primary</h4>
                    <div className="flex flex-wrap gap-1">
                      {exercise.primary_muscles.map((muscle) => (
                        <Badge key={muscle} variant="default" className="text-xs py-0 px-2">
                          {formatMuscleGroups([muscle])}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium mb-1 flex items-center text-muted-foreground">
                      <HeartIcon className="h-3 w-3 mr-1" />
                      Secondary
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {exercise.secondary_muscles.map((muscle) => (
                        <Badge key={muscle} variant="secondary" className="text-xs py-0 px-2">
                          {formatMuscleGroups([muscle])}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Equipment */}
            {exercise.available_equipment && exercise.available_equipment.length > 0 && (
              <>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Equipment Options</h3>
                  <div className="grid grid-cols-2 gap-1">
                    {exercise.available_equipment.map((equipment) => (
                      <div 
                        key={equipment} 
                        className={`p-1.5 rounded border text-xs ${
                          exercise.default_equipment === equipment 
                            ? "border-primary bg-primary/5" 
                            : "border-border"
                        }`}
                      >
                        {equipment.replace('_', ' ')}
                        {exercise.default_equipment === equipment && (
                          <span className="text-xs text-primary ml-1">(default)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Instructions */}
            {exercise.description && (
              <div>
                <h3 className="text-base font-semibold mb-3 flex items-center">
                  <InfoIcon className="h-4 w-4 mr-2" />
                  Instructions
                </h3>
                <div className="text-sm">
                  {renderDescription(exercise.description)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex-shrink-0 border-t pt-3 mt-2">
          <div className="flex gap-3">
            {showSelectButton && onSelect && (
              <Button onClick={handleSelectClick} className="flex-1" size="sm">
                Select Exercise
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1" size="sm">
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
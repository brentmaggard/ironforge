'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Exercise, getDifficultyLevel, getSafetyRating, formatMuscleGroups } from '@/types/exercises';
import { 
  ArrowLeftIcon,
  DumbbellIcon, 
  HeartIcon, 
  StarIcon, 
  UserIcon, 
  AlertTriangleIcon,
  WeightIcon,
  TargetIcon,
  InfoIcon
} from 'lucide-react';

async function fetchExercise(id: string): Promise<Exercise> {
  const response = await fetch(`/api/exercises/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise');
  }
  return response.json();
}

export default function ExerciseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  
  const { data: exercise, isLoading, error } = useQuery({
    queryKey: ['exercise', resolvedParams.id],
    queryFn: () => fetchExercise(resolvedParams.id),
    retry: 2,
  });

  const handleBack = () => {
    router.back();
  };

  const renderDescription = (description: string) => {
    return description
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return (
            <h3 key={index} className="font-semibold mt-6 mb-3 text-lg">
              {line.replace('## ', '')}
            </h3>
          );
        } else if (line.match(/^\d+\./)) {
          return (
            <div key={index} className="ml-6 mb-2">
              {line}
            </div>
          );
        } else if (line.startsWith('- ')) {
          return (
            <div key={index} className="ml-6 mb-2">
              • {line.replace('- ', '')}
            </div>
          );
        } else if (line.trim() === '') {
          return <div key={index} className="h-3" />;
        } else {
          return (
            <p key={index} className="mb-3">
              {line}
            </p>
          );
        }
      });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-muted rounded-lg" />
            <div className="h-32 bg-muted rounded-lg" />
          </div>
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Exercise Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              Sorry, we couldn't find the exercise you're looking for.
            </p>
            <Button onClick={handleBack}>
              Back to Exercises
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const difficultyLevel = getDifficultyLevel(exercise.difficulty_level);
  const safetyRating = getSafetyRating(exercise.safety_rating);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{exercise.name}</h1>
          {exercise.default_equipment && (
            <p className="text-muted-foreground text-lg capitalize">
              {exercise.default_equipment.replace('_', ' ')} exercise
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats and Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exercise.difficulty_level && (
                <div className="flex items-center gap-3">
                  <StarIcon className="h-5 w-5" style={{ color: difficultyLevel.color }} />
                  <div>
                    <p className="font-medium">Difficulty</p>
                    <p className="text-sm text-muted-foreground">{difficultyLevel.label}</p>
                  </div>
                </div>
              )}

              {exercise.safety_rating && (
                <div className="flex items-center gap-3">
                  <AlertTriangleIcon className="h-5 w-5" style={{ color: safetyRating.color }} />
                  <div>
                    <p className="font-medium">Safety</p>
                    <p className="text-sm text-muted-foreground">{safetyRating.label}</p>
                  </div>
                </div>
              )}

              {/* Exercise Attributes */}
              <div className="flex flex-wrap gap-2">
                {exercise.is_compound && (
                  <Badge variant="default">
                    <TargetIcon className="h-3 w-3 mr-1" />
                    Compound
                  </Badge>
                )}
                {exercise.is_unilateral && (
                  <Badge variant="secondary">
                    Unilateral
                  </Badge>
                )}
                {exercise.requires_spotter && (
                  <Badge variant="destructive">
                    <UserIcon className="h-3 w-3 mr-1" />
                    Requires Spotter
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Starting Weights */}
          {(exercise.starting_weight_lbs || exercise.starting_weight_kg) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <WeightIcon className="h-5 w-5 mr-2" />
                  Suggested Starting Weights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {exercise.starting_weight_lbs && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Imperial</p>
                    <p className="text-2xl font-bold">{exercise.starting_weight_lbs} lbs</p>
                    {exercise.default_warmup_weight && (
                      <p className="text-sm text-muted-foreground">
                        Warmup: {exercise.default_warmup_weight} lbs
                      </p>
                    )}
                  </div>
                )}
                {exercise.starting_weight_kg && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Metric</p>
                    <p className="text-2xl font-bold">{exercise.starting_weight_kg} kg</p>
                    {exercise.default_warmup_weight && (
                      <p className="text-sm text-muted-foreground">
                        Warmup: {Math.round(exercise.default_warmup_weight * 0.453592)} kg
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Equipment */}
          {exercise.available_equipment && exercise.available_equipment.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Equipment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {exercise.available_equipment.map((equipment) => (
                    <div 
                      key={equipment} 
                      className={`p-3 rounded-lg border ${
                        exercise.default_equipment === equipment 
                          ? "border-primary bg-primary/5" 
                          : "border-border"
                      }`}
                    >
                      <p className="font-medium capitalize">
                        {equipment.replace('_', ' ')}
                        {exercise.default_equipment === equipment && (
                          <span className="text-sm text-primary ml-2">(Recommended)</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Muscles and Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Muscle Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <DumbbellIcon className="h-5 w-5 mr-2" />
                Target Muscles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Primary Muscles</h4>
                  <div className="flex flex-wrap gap-2">
                    {exercise.primary_muscles.map((muscle) => (
                      <Badge key={muscle} variant="default" className="px-3 py-1">
                        {formatMuscleGroups([muscle])}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center text-muted-foreground">
                    <HeartIcon className="h-4 w-4 mr-2" />
                    Secondary Muscles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exercise.secondary_muscles.map((muscle) => (
                      <Badge key={muscle} variant="secondary" className="px-3 py-1">
                        {formatMuscleGroups([muscle])}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          {exercise.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <InfoIcon className="h-5 w-5 mr-2" />
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {renderDescription(exercise.description)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="mt-8 flex gap-4 justify-center">
        <Button variant="outline" onClick={handleBack} className="px-8">
          Back to Exercises
        </Button>
        <Button className="px-8">
          Add to Workout
        </Button>
      </div>
    </div>
  );
}
// src/components/exercises/ExerciseFilters.tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ExerciseFilters as IExerciseFilters, ExerciseCategory, ExerciseEquipment, DIFFICULTY_LEVELS, COMMON_MUSCLES, BODY_PARTS } from '@/types/exercises';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

interface ExerciseFiltersProps {
  filters: IExerciseFilters;
  onChange: (filters: IExerciseFilters) => void;
  categories: ExerciseCategory[];
  equipment: ExerciseEquipment[];
}

export function ExerciseFilters({ filters, onChange, categories, equipment }: ExerciseFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: false,
    equipment: true,
    muscles: false,
    bodyParts: false,
    difficulty: false,
    attributes: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter(c => c !== categoryId);
    
    onChange({ ...filters, categories: newCategories });
  };

  const handleEquipmentChange = (equipmentId: string, checked: boolean) => {
    const currentEquipment = filters.equipment || [];
    const newEquipment = checked
      ? [...currentEquipment, equipmentId]
      : currentEquipment.filter(e => e !== equipmentId);
    
    onChange({ ...filters, equipment: newEquipment });
  };

  const handleMuscleChange = (muscle: string, checked: boolean) => {
    const currentMuscles = filters.muscles || [];
    const newMuscles = checked
      ? [...currentMuscles, muscle]
      : currentMuscles.filter(m => m !== muscle);
    
    onChange({ ...filters, muscles: newMuscles });
  };

  const handleBodyPartChange = (bodyPart: string, checked: boolean) => {
    const currentBodyParts = filters.bodyParts || [];
    const newBodyParts = checked
      ? [...currentBodyParts, bodyPart]
      : currentBodyParts.filter(bp => bp !== bodyPart);
    
    onChange({ ...filters, bodyParts: newBodyParts });
  };

  const handleDifficultyChange = (values: number[]) => {
    onChange({
      ...filters,
      difficultyMin: values[0],
      difficultyMax: values[1]
    });
  };

  const formatMuscleLabel = (muscle: string) => {
    return muscle.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatBodyPartLabel = (bodyPart: string) => {
    return bodyPart.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Label className="text-sm font-medium">Exercise Categories</Label>
          {openSections.categories ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.category_id}`}
                checked={filters.categories?.includes(category.category_id) || false}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.category_id, checked as boolean)
                }
              />
              <Label htmlFor={`category-${category.category_id}`} className="text-sm flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Equipment */}
      <Collapsible open={openSections.equipment} onOpenChange={() => toggleSection('equipment')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Label className="text-sm font-medium">Equipment</Label>
          {openSections.equipment ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          {equipment.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`equipment-${item.equipment_id}`}
                checked={filters.equipment?.includes(item.equipment_id) || false}
                onCheckedChange={(checked) => 
                  handleEquipmentChange(item.equipment_id, checked as boolean)
                }
              />
              <Label htmlFor={`equipment-${item.equipment_id}`} className="text-sm">
                {item.name}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Muscle Groups */}
      <Collapsible open={openSections.muscles} onOpenChange={() => toggleSection('muscles')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Label className="text-sm font-medium">Muscle Groups</Label>
          {openSections.muscles ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
            {COMMON_MUSCLES.map((muscle) => (
              <div key={muscle} className="flex items-center space-x-2">
                <Checkbox
                  id={`muscle-${muscle}`}
                  checked={filters.muscles?.includes(muscle) || false}
                  onCheckedChange={(checked) => 
                    handleMuscleChange(muscle, checked as boolean)
                  }
                />
                <Label htmlFor={`muscle-${muscle}`} className="text-sm">
                  {formatMuscleLabel(muscle)}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Body Parts */}
      <Collapsible open={openSections.bodyParts} onOpenChange={() => toggleSection('bodyParts')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Label className="text-sm font-medium">Body Parts</Label>
          {openSections.bodyParts ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          {BODY_PARTS.map((bodyPart) => (
            <div key={bodyPart} className="flex items-center space-x-2">
              <Checkbox
                id={`bodypart-${bodyPart}`}
                checked={filters.bodyParts?.includes(bodyPart) || false}
                onCheckedChange={(checked) => 
                  handleBodyPartChange(bodyPart, checked as boolean)
                }
              />
              <Label htmlFor={`bodypart-${bodyPart}`} className="text-sm">
                {formatBodyPartLabel(bodyPart)}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Difficulty Range */}
      <Collapsible open={openSections.difficulty} onOpenChange={() => toggleSection('difficulty')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Label className="text-sm font-medium">Difficulty Level</Label>
          {openSections.difficulty ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          <div className="px-2">
            <Slider
              value={[filters.difficultyMin || 1, filters.difficultyMax || 5]}
              min={1}
              max={5}
              step={1}
              onValueChange={handleDifficultyChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              {DIFFICULTY_LEVELS.map((level) => (
                <span
                  key={level.value}
                  className={
                    level.value >= (filters.difficultyMin || 1) && 
                    level.value <= (filters.difficultyMax || 5)
                      ? 'font-medium'
                      : ''
                  }
                >
                  {level.label}
                </span>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Exercise Attributes */}
      <Collapsible open={openSections.attributes} onOpenChange={() => toggleSection('attributes')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Label className="text-sm font-medium">Exercise Attributes</Label>
          {openSections.attributes ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="compound"
              checked={filters.isCompound === true}
              onCheckedChange={(checked) => 
                onChange({ ...filters, isCompound: checked ? true : undefined })
              }
            />
            <Label htmlFor="compound" className="text-sm">
              Compound exercises only
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="spotter"
              checked={filters.requiresSpotter === true}
              onCheckedChange={(checked) => 
                onChange({ ...filters, requiresSpotter: checked ? true : undefined })
              }
            />
            <Label htmlFor="spotter" className="text-sm">
              Requires spotter
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
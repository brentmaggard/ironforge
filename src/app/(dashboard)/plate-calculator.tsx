import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Settings,
  Plus,
  Minus,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const PlateCalculator = () => {
  const [targetWeight, setTargetWeight] = useState(185);
  const [units, setUnits] = useState('lb'); // 'lb' or 'kg'
  const [showSettings, setShowSettings] = useState(false);

  // Equipment configuration
  const [equipment, setEquipment] = useState({
    barbells: [
      { weight: 45, unit: 'lb', name: 'Olympic Barbell', active: true },
      { weight: 35, unit: 'lb', name: 'Women\'s Barbell', active: false },
      { weight: 20, unit: 'kg', name: 'Olympic Barbell (kg)', active: false },
    ],
    plates: [
      { weight: 45, unit: 'lb', count: 4, color: 'red' },
      { weight: 35, unit: 'lb', count: 2, color: 'blue' },
      { weight: 25, unit: 'lb', count: 4, color: 'green' },
      { weight: 10, unit: 'lb', count: 4, color: 'white' },
      { weight: 5, unit: 'lb', count: 4, color: 'white' },
      { weight: 2.5, unit: 'lb', count: 4, color: 'white' },
      { weight: 1.25, unit: 'lb', count: 4, color: 'white' },
      // Kg plates
      { weight: 25, unit: 'kg', count: 2, color: 'red' },
      { weight: 20, unit: 'kg', count: 2, color: 'blue' },
      { weight: 15, unit: 'kg', count: 2, color: 'yellow' },
      { weight: 10, unit: 'kg', count: 2, color: 'green' },
      { weight: 5, unit: 'kg', count: 2, color: 'white' },
      { weight: 2.5, unit: 'kg', count: 2, color: 'white' },
      { weight: 1.25, unit: 'kg', count: 2, color: 'white' },
    ]
  });

  // Get active barbell
  const activeBarbell = useMemo(() =>
    equipment.barbells.find(b => b.active) || equipment.barbells[0]
  , [equipment.barbells]);

  // Get available plates for current units
  const availablePlates = useMemo(() =>
    equipment.plates
      .filter(p => p.unit === units && p.count > 0)
      .sort((a, b) => b.weight - a.weight)
  , [equipment.plates, units]);

  // Calculate plate combination
  const plateCalculation = useMemo(() => {
    const barbellWeight = units === activeBarbell.unit ?
      activeBarbell.weight :
      (activeBarbell.unit === 'lb' ? activeBarbell.weight * 0.453592 : activeBarbell.weight / 0.453592);

    const targetPlateWeight = Math.max(0, targetWeight - barbellWeight);
    const weightPerSide = targetPlateWeight / 2;

    const result = {
      barbell: activeBarbell,
      barbellWeight: Math.round(barbellWeight * 100) / 100,
      targetWeight,
      plateWeight: targetPlateWeight,
      weightPerSide,
      plates: [],
      actualWeight: barbellWeight,
      difference: 0,
      possible: true
    };

    let remainingWeight = weightPerSide;
    const usedPlates = [];
    const plateInventory = [...availablePlates];

    // Greedy algorithm to find plate combination
    for (const plate of plateInventory) {
      if (remainingWeight <= 0) break;

      const platesNeeded = Math.min(
        Math.floor(remainingWeight / plate.weight),
        Math.floor(plate.count / 2) // Each plate is used on both sides
      );

      if (platesNeeded > 0) {
        usedPlates.push({
          ...plate,
          count: platesNeeded,
          totalWeight: platesNeeded * plate.weight
        });
        remainingWeight -= platesNeeded * plate.weight;
        remainingWeight = Math.round(remainingWeight * 100) / 100; // Fix floating point
      }
    }

    result.plates = usedPlates;
    result.actualWeight = barbellWeight + (usedPlates.reduce((sum, p) => sum + p.totalWeight, 0) * 2);
    result.difference = result.actualWeight - targetWeight;
    result.possible = Math.abs(result.difference) < 0.01;

    return result;
  }, [targetWeight, units, activeBarbell, availablePlates]);

  // Color mapping for plates
  const getPlateColor = (color, weight) => {
    const colorMap = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      white: 'bg-gray-200 border-2 border-gray-400',
      black: 'bg-gray-800'
    };
    return colorMap[color] || 'bg-gray-400';
  };

  // Visual barbell representation
  const BarbellVisualization = ({ calculation }) => {
    const maxPlateRadius = 60;
    const barbellWidth = 20;
    const barbellLength = 400;

    return (
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Calculator size={20} />
          <span>Plate Loading</span>
        </h3>

        <div className="flex items-center justify-center min-h-[200px] relative">
          {/* Barbell */}
          <div
            className="bg-gray-400 relative rounded-full"
            style={{ width: `${barbellLength}px`, height: `${barbellWidth}px` }}
          >
            {/* Center knurling indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-gray-600 rounded"></div>

            {/* Left side plates */}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 flex flex-row-reverse items-center">
              {calculation.plates.map((plate, idx) => (
                <div key={`left-${idx}`} className="flex flex-row-reverse">
                  {Array.from({ length: plate.count }).map((_, plateIdx) => (
                    <div
                      key={plateIdx}
                      className={`rounded-full flex items-center justify-center text-white text-xs font-bold border-r-2 border-gray-300 ${getPlateColor(plate.color)}`}
                      style={{
                        width: `${Math.max(30, Math.min(maxPlateRadius, plate.weight * 2 + 20))}px`,
                        height: `${Math.max(30, Math.min(maxPlateRadius, plate.weight * 2 + 20))}px`,
                        marginRight: plateIdx === 0 ? '8px' : '2px'
                      }}
                    >
                      {plate.weight}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right side plates */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 flex items-center">
              {calculation.plates.map((plate, idx) => (
                <div key={`right-${idx}`} className="flex">
                  {Array.from({ length: plate.count }).map((_, plateIdx) => (
                    <div
                      key={plateIdx}
                      className={`rounded-full flex items-center justify-center text-white text-xs font-bold border-l-2 border-gray-300 ${getPlateColor(plate.color)}`}
                      style={{
                        width: `${Math.max(30, Math.min(maxPlateRadius, plate.weight * 2 + 20))}px`,
                        height: `${Math.max(30, Math.min(maxPlateRadius, plate.weight * 2 + 20))}px`,
                        marginLeft: plateIdx === 0 ? '8px' : '2px'
                      }}
                    >
                      {plate.weight}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Equipment Settings Modal
  const EquipmentSettings = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Equipment Settings</h3>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Barbells */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Barbells</h4>
            <div className="space-y-2">
              {equipment.barbells.map((barbell, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="activeBarbell"
                      checked={barbell.active}
                      onChange={() => {
                        setEquipment(prev => ({
                          ...prev,
                          barbells: prev.barbells.map((b, i) => ({
                            ...b,
                            active: i === idx
                          }))
                        }));
                      }}
                      className="text-blue-600"
                    />
                    <div>
                      <div className="font-medium">{barbell.name}</div>
                      <div className="text-sm text-gray-500">{barbell.weight} {barbell.unit}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plates */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Available Plates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {equipment.plates.map((plate, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full ${getPlateColor(plate.color)} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {plate.weight}
                    </div>
                    <div>
                      <div className="font-medium">{plate.weight} {plate.unit}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEquipment(prev => ({
                          ...prev,
                          plates: prev.plates.map((p, i) =>
                              i === idx ? { ...p, count: Math.max(0, p.count - 1) } : p
                          )
                        }));
                      }}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      disabled={plate.count === 0}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{plate.count}</span>
                    <button
                      onClick={() => {
                        setEquipment(prev => ({
                          ...prev,
                          plates: prev.plates.map((p, i) =>
                              i === idx ? { ...p, count: p.count + 1 } : p
                          )
                        }));
                      }}
                      className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t">
          <button
            onClick={() => setShowSettings(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plate Calculator</h1>
          <p className="text-gray-600 mt-1">Calculate the plates needed for your target weight</p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Settings size={16} />
          <span>Equipment</span>
        </button>
      </div>

      {/* Weight Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-lg font-medium text-gray-900">Target Weight:</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTargetWeight(Math.max(0, targetWeight - (units === 'lb' ? 5 : 2.5)))}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Minus size={20} />
              </button>
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-24 text-center text-xl font-bold border border-gray-300 rounded-lg px-3 py-2"
                step={units === 'lb' ? 5 : 2.5}
              />
              <button
                onClick={() => setTargetWeight(targetWeight + (units === 'lb' ? 5 : 2.5))}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setUnits('lb')}
                className={`px-3 py-1 rounded font-medium ${units === 'lb' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                lb
              </button>
              <button
                onClick={() => setUnits('kg')}
                className={`px-3 py-1 rounded font-medium ${units === 'kg' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                kg
              </button>
            </div>
          </div>
        </div>

        {/* Quick Weight Buttons */}
        <div className="flex justify-center space-x-2 mb-6">
          {units === 'lb'
            ? [135, 155, 185, 205, 225, 275, 315, 405].map(weight => (
                <button
                  key={weight}
                  onClick={() => setTargetWeight(weight)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${targetWeight === weight ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {weight}
                </button>
              ))
            : [60, 80, 100, 120, 140, 160, 180, 200].map(weight => (
                <button
                  key={weight}
                  onClick={() => setTargetWeight(weight)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${targetWeight === weight ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {weight}
                </button>
              ))
          }
        </div>
      </div>

      {/* Barbell Visualization */}
      <BarbellVisualization calculation={plateCalculation} />

      {/* Calculation Results */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loading Instructions</h3>

        {plateCalculation.possible ? (
          <div className="space-y-4">
            {/* Status */}
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle size={20} />
              <span className="font-medium">
                Exact weight achievable: {plateCalculation.actualWeight} {units}
              </span>
            </div>

            {/* Barbell */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {plateCalculation.barbell.name}
                </span>
                <span className="font-bold">
                  {plateCalculation.barbellWeight} {units}
                </span>
              </div>
            </div>

            {/* Plates per side */}
            {plateCalculation.plates.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Plates per side:</h4>
                <div className="space-y-2">
                  {plateCalculation.plates.map((plate, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full ${getPlateColor(plate.color)} flex items-center justify-center text-white text-sm font-bold`}
                        >
                          {plate.weight}
                        </div>
                        <div>
                          <div className="font-medium">{plate.weight} {units} plates</div>
                          <div className="text-sm text-gray-600">
                            {plate.count} × {plate.weight} = {plate.totalWeight} {units}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{plate.count}×</div>
                        <div className="text-sm text-gray-500">per side</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Summary */}
            <div className="border-t pt-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Loading Summary</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• Start with the barbell ({plateCalculation.barbellWeight} {units})</div>
                  {plateCalculation.plates.map((plate, idx) => (
                    <div key={idx}>• Add {plate.count} × {plate.weight} {units} plates to each side</div>
                  ))}
                  <div className="font-medium pt-2">
                    Total: {plateCalculation.actualWeight} {units}
                  </div>
                </div>
              </div>
            </div>

            {/* Liftosaur-style notation */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center space-x-2 mb-2">
                <Info size={16} className="text-blue-600" />
                <span className="font-medium">Plate Notation</span>
              </div>
              <div className="font-mono text-lg text-center bg-white rounded px-4 py-2 border">
                {plateCalculation.plates.map(p =>
                  Array(p.count).fill(`${p.weight}`).join('/')
                ).join('/')} {plateCalculation.actualWeight}{units}
              </div>
              <div className="text-xs text-gray-600 text-center mt-2">
                This notation shows all plates per side, followed by total weight
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle size={20} />
              <span className="font-medium">
                Cannot achieve exact weight with available equipment
              </span>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-red-700">
                <div>Closest achievable: {plateCalculation.actualWeight} {units}</div>
                <div>Difference: {Math.abs(plateCalculation.difference).toFixed(1)} {units}
                  {plateCalculation.difference > 0 ? ' over' : ' under'} target
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setTargetWeight(plateCalculation.actualWeight)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Use {plateCalculation.actualWeight} {units}</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <Settings size={16} />
                <span>Add More Plates</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Equipment Settings Modal */}
      {showSettings && <EquipmentSettings />}
    </div>
  );
};

export default PlateCalculator;

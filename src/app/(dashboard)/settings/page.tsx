"use client";
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Equipment</h3>
          <p className="text-sm text-gray-600 mb-3">Configure your available plates and equipment</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Configure Equipment</button>
        </div>
        <hr />
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Units</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="units" defaultChecked className="text-blue-600" />
              <span className="text-sm">Pounds (lb)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="units" className="text-blue-600" />
              <span className="text-sm">Kilograms (kg)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { FileText, MapPin, Heart, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const countries = ["USA", "India", "UK"];
const religions = ["Christianity", "Islam", "Hinduism"];

const paperworkSteps = {
  USA: {
    Christianity: [
      "Obtain death certificate from attending physician or coroner",
      "Contact funeral home to arrange services",
      "Notify Social Security Administration",
      "Arrange burial permit through local authorities",
      "Contact insurance companies and banks",
      "File final tax return with IRS"
    ],
    Islam: [
      "Obtain death certificate from attending physician or coroner",
      "Perform Ghusl (ritual washing) through Muslim community",
      "Arrange Janazah prayer at mosque",
      "Obtain burial permit for burial within 24 hours",
      "Contact Islamic funeral services",
      "Notify community and arrange for funeral prayers"
    ],
    Hinduism: [
      "Obtain death certificate from attending physician or coroner",
      "Inform priest and extended family members",
      "Perform Antyesti rites according to tradition",
      "Arrange cremation through authorized facility",
      "Complete 13-day mourning period rituals",
      "Handle estate and legal documentation"
    ],
  },
  India: {
    Christianity: [
      "Obtain medical certificate of cause of death",
      "Inform local registrar within 21 days",
      "Register death with municipal corporation",
      "Contact church for funeral arrangements",
      "Arrange burial permit through local authorities",
      "Complete succession certificate if needed"
    ],
    Islam: [
      "Obtain medical certificate of cause of death",
      "Register death with local authorities within 21 days",
      "Perform Ghusl (ritual washing)",
      "Arrange Janazah prayer at local mosque",
      "Obtain burial permit for immediate burial",
      "Complete legal heir certificate process"
    ],
    Hinduism: [
      "Obtain medical certificate of cause of death",
      "Register death with registrar within 21 days",
      "Inform priest and perform last rites",
      "Arrange cremation at designated crematorium",
      "Complete Asthi Visarjan (ash immersion) ceremony",
      "Handle succession and property transfer documents"
    ],
  },
  UK: {
    Christianity: [
      "Register death with local registrar within 5 days",
      "Obtain death certificate and certified copies",
      "Contact church for funeral service arrangements",
      "Arrange burial or cremation permit",
      "Notify relevant government departments",
      "Handle probate and estate administration"
    ],
    Islam: [
      "Register death with local registrar within 5 days",
      "Obtain death certificate and certified copies",
      "Perform Ghusl (ritual washing) through Muslim community",
      "Arrange Janazah prayer at mosque",
      "Obtain burial permit and arrange burial quickly",
      "Complete Islamic inheritance distribution"
    ],
    Hinduism: [
      "Register death with local registrar within 5 days",
      "Obtain death certificate and certified copies",
      "Contact Hindu priest for final rites guidance",
      "Arrange cremation at authorized crematorium",
      "Perform traditional ceremonies and rituals",
      "Handle legal documentation and estate matters"
    ],
  },
};

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedReligion, setSelectedReligion] = useState<string>("");
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const currentSteps = selectedCountry && selectedReligion 
    ? paperworkSteps[selectedCountry as keyof typeof paperworkSteps]?.[selectedReligion as keyof typeof paperworkSteps.USA] || []
    : [];

  const toggleStep = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    if (completedSteps.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const resetSelection = () => {
    setSelectedCountry("");
    setSelectedReligion("");
    setCompletedSteps(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-800">Death Paperwork Guide</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Navigate the complex paperwork requirements with compassionate guidance tailored to your location and religious practices.
          </p>
        </div>

        {/* Selection Cards */}
        {(!selectedCountry || !selectedReligion) && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Country Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-emerald-600 mr-3" />
                <h2 className="text-2xl font-semibold text-slate-800">Select Country</h2>
              </div>
              <div className="space-y-3">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedCountry === country
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-25'
                    }`}
                  >
                    <div className="font-medium">{country}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Religion Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <Heart className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-slate-800">Select Religion</h2>
              </div>
              <div className="space-y-3">
                {religions.map((religion) => (
                  <button
                    key={religion}
                    onClick={() => setSelectedReligion(religion)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedReligion === religion
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <div className="font-medium">{religion}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Steps Display */}
        {selectedCountry && selectedReligion && currentSteps.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Paperwork Guide</h2>
                  <p className="text-slate-200">
                    {selectedReligion} practices in {selectedCountry}
                  </p>
                </div>
                <button
                  onClick={resetSelection}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Change Selection
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Progress</span>
                <span className="text-sm font-medium text-slate-800">
                  {completedSteps.size} of {currentSteps.length} completed
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedSteps.size / currentSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Steps List */}
            <div className="p-6">
              <div className="space-y-4">
                {currentSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-start p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      completedSteps.has(index)
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    onClick={() => toggleStep(index)}
                  >
                    <div className="flex-shrink-0 mr-4 mt-0.5">
                      {completedSteps.has(index) ? (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-slate-500 mr-3">
                          Step {index + 1}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                      <p className={`mt-1 leading-relaxed ${
                        completedSteps.has(index) 
                          ? 'text-emerald-800 font-medium' 
                          : 'text-slate-700'
                      }`}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion Message */}
              {completedSteps.size === currentSteps.length && currentSteps.length > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-800">All Steps Completed</h3>
                      <p className="text-emerald-700">
                        You have successfully completed all required paperwork steps. Please keep all documents in a safe place.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            This guide provides general information. Please consult with local authorities and professionals for specific requirements.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { FileText, MapPin, Heart, CheckCircle, Circle, ArrowRight, Crown } from 'lucide-react';

const countries = ["USA", "India", "UK"];
const religions = ["Christianity", "Islam", "Hinduism"];
const afterlifeExperiences = [
  "Turn yourself into a diamond",
  "Compost yourself into a tree",
  "Become a coral reef memorial",
  "Launch ashes into space",
  "Vinyl record pressing",
  "Fireworks memorial",
];

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
  const [isPremiumOpen, setIsPremiumOpen] = useState<boolean>(false);
  const [isPremiumActive, setIsPremiumActive] = useState<boolean>(false);
  const [premiumExpanded, setPremiumExpanded] = useState<Set<number>>(new Set());
  const [showUkIslamRegistrarList, setShowUkIslamRegistrarList] = useState<boolean>(false);
  const [view, setView] = useState<'landing' | 'guide'>('landing');
  const [showLegacyOptions, setShowLegacyOptions] = useState<boolean>(false);
  const [isLegacyMode, setIsLegacyMode] = useState<boolean>(false);
  const [selectedAfterlife, setSelectedAfterlife] = useState<string>("");

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
    setPremiumExpanded(new Set());
    setShowUkIslamRegistrarList(false);
    setSelectedAfterlife("");
  };

  const togglePremiumExpanded = (stepIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const next = new Set(premiumExpanded);
    if (next.has(stepIndex)) {
      next.delete(stepIndex);
    } else {
      next.add(stepIndex);
    }
    setPremiumExpanded(next);
  };

  const getPremiumDetail = (step: string): string => {
    // Simple prototype details for Premium users
    if (step.toLowerCase().includes('death certificate')) {
      return 'Who to contact, typical processing times (1-3 days), and required IDs/forms.';
    }
    if (step.toLowerCase().includes('funeral')) {
      return 'Compare providers, request itemized price lists, and confirm cultural preferences.';
    }
    if (step.toLowerCase().includes('burial') || step.toLowerCase().includes('cremation')) {
      return 'Local permits, schedule coordination, and transport arrangements with checklists.';
    }
    if (step.toLowerCase().includes('social security') || step.toLowerCase().includes('government')) {
      return 'Notification templates, phone numbers, and what documents to have ready.';
    }
    if (step.toLowerCase().includes('insurance') || step.toLowerCase().includes('banks')) {
      return 'Claim forms, beneficiary guidance, and account access steps with timelines.';
    }
    if (step.toLowerCase().includes('tax')) {
      return 'Filing status guidance, deadlines, and documents to gather for final returns.';
    }
    return 'Expanded tips, contacts, and document templates to complete this step smoothly.';
  };

  const renderUkIslamDetail = (stepIndex: number) => {
    if (selectedCountry !== 'UK' || selectedReligion !== 'Islam') {
      return null;
    }
    switch (stepIndex) {
      case 0:
        return (
          <div className="space-y-2">
            <div><span className="font-medium">Who Can Register:</span> The death must be registered by a relative, someone present at the death, or someone who has knowledge of the details.</div>
            <div><span className="font-medium">Where to Register:</span> You can register the death at the local registrar's office in the area where the death occurred.</div>
            <div>
              <button
                className="text-amber-700 hover:text-amber-800 underline text-sm font-medium"
                onClick={(e) => { e.stopPropagation(); setShowUkIslamRegistrarList(!showUkIslamRegistrarList); }}
              >
                {showUkIslamRegistrarList ? 'Hide nearby registration offices' : 'View nearby registration offices'}
              </button>
              {showUkIslamRegistrarList && (
                <ul className="mt-2 list-disc list-inside ml-4 text-slate-700">
                  <li>Westminster Register Office — 317 Harrow Rd, London W9 3RJ</li>
                  <li>Islington and City Register Office — Town Hall, Upper St, London N1 2UD</li>
                  <li>Newham Register Office — 207 Plashet Grove, London E6 1BX</li>
                </ul>
              )}
            </div>
            <div>
              <span className="font-medium">Documents Needed:</span>
              <ul className="list-disc list-inside ml-4">
                <li>Medical certificate of cause of death (issued by a doctor).</li>
                <li>Personal details of the deceased (full name, date of birth, address, occupation).</li>
                <li>Details of the informant (your name, address, relationship to the deceased).</li>
              </ul>
            </div>
            <div><span className="font-medium">Time Frame:</span> Registration must be completed within <span className="font-semibold">5 days</span> of the death, excluding weekends and public holidays.</div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-2">
            <div><span className="font-medium">Death Certificate:</span> After registration, you will receive an official death certificate. This document is essential for legal and administrative purposes.</div>
            <div><span className="font-medium">Certified Copies:</span> You can request certified copies of the death certificate at the time of registration or later. It’s advisable to obtain multiple copies (usually 3–5) as they may be needed for various institutions (banks, insurance, etc.).</div>
            <div><span className="font-medium">Cost:</span> There may be a fee for each certified copy, which varies by local authority.</div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <div><span className="font-medium">What is Ghusl?</span> Ghusl is the ritual washing of the deceased, which is an important part of Islamic funeral rites.</div>
            <div><span className="font-medium">Who Performs Ghusl?</span> This is typically done by family members or members of the Muslim community who are trained in the process.</div>
            <div><span className="font-medium">Where to Perform Ghusl:</span> Many mosques or Islamic centers have facilities for performing Ghusl. You can contact your local mosque to arrange this.</div>
            <div><span className="font-medium">Process:</span> The body is washed in a specific manner, often three times, with the intention of purification. It is important to ensure that the body is treated with respect throughout the process.</div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            <div><span className="font-medium">What is Janazah?</span> Janazah is the funeral prayer performed for the deceased, which is a communal obligation in Islam.</div>
            <div><span className="font-medium">Arranging the Prayer:</span> Contact your local mosque to arrange the Janazah prayer. They will guide you on the timing and any specific requirements.</div>
            <div><span className="font-medium">Timing:</span> The Janazah prayer is usually held shortly after Ghusl and before burial. It is important to coordinate with the mosque to ensure that the prayer can be conducted in a timely manner.</div>
            <div><span className="font-medium">Community Involvement:</span> Encourage family and friends to attend the Janazah prayer, as it is a significant part of the mourning process and community support.</div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-2">
            <div className="font-medium">Obtaining a Burial Permit</div>
            <div><span className="font-medium">What is a Burial Permit?</span> A burial permit is a legal document that allows for the burial of the deceased. It is typically issued by the local authority or council.</div>
            <div><span className="font-medium">Who Can Apply?</span> The application can be made by a relative, the funeral director, or someone responsible for making the arrangements.</div>
            <div>
              <span className="font-medium">Documents Required:</span>
              <ul className="list-disc list-inside ml-4">
                <li>Death certificate (or a certified copy).</li>
                <li>Application form (available from the local council or online).</li>
                <li>Any additional documentation required by the local authority (this may vary by location).</li>
              </ul>
            </div>
            <div><span className="font-medium">Time Frame:</span> It’s advisable to apply for the burial permit as soon as possible after obtaining the death certificate, as this can expedite the burial process.</div>
            <div className="font-medium">Arranging Burial</div>
            <div><span className="font-medium">Choosing a Burial Site:</span> Decide on the burial location, which could be a local cemetery or a designated Muslim burial ground. Many mosques can provide guidance on suitable burial sites.</div>
            <div><span className="font-medium">Contacting a Funeral Director:</span> Engaging a funeral director who is familiar with Islamic burial practices can help streamline the process. They can assist with obtaining the burial permit and making arrangements for the burial.</div>
            <div><span className="font-medium">Timing:</span> In Islam, it is preferred to bury the deceased as soon as possible, ideally within 24 hours of death. Coordinate with the funeral director and the cemetery to arrange a suitable time for the burial.</div>
            <div><span className="font-medium">Burial Ceremony:</span> The burial should be conducted according to Islamic rites, which include specific prayers and rituals. Family and community members are encouraged to participate in the burial.</div>
            <div className="font-medium">Additional Considerations</div>
            <div><span className="font-medium">Costs:</span> Be aware of any fees associated with the burial permit and cemetery services. It’s wise to discuss costs upfront with the funeral director.</div>
            <div><span className="font-medium">Community Support:</span> Involve family and friends in the burial arrangements, as their support can be invaluable during this time.</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-800">World of Grim</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Thoughtful tools for planning ahead and supporting loved ones when it matters most.
          </p>
        </div>

        {view === 'landing' && (
          <div className="space-y-10">
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow"
                onClick={() => { setView('guide'); setIsLegacyMode(true); resetSelection(); setShowLegacyOptions(false); }}
              >
                Your legacy
              </button>
              <button
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow"
                onClick={() => { setShowLegacyOptions((v) => !v); setIsLegacyMode(false); }}
              >
                Close ones
              </button>
            </div>

            {/* Close ones sub-options */}
            {showLegacyOptions && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  className="w-full sm:w-auto px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors"
                  onClick={() => { setView('guide'); resetSelection(); }}
                >
                  With profile
                </button>
                <button
                  className="w-full sm:w-auto px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors"
                  onClick={() => { setView('guide'); resetSelection(); }}
                >
                  Without profile
                </button>
              </div>
            )}

            {/* Services overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Plan Your Legacy</h3>
                <p className="text-slate-600 mb-3">Capture wishes, contacts, and key documents in one organized place. Share your preferences to ease decisions for those you love.</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Store preferences for religious or cultural practices</li>
                  <li>Document locations for insurance, banking, and will</li>
                  <li>Generate personalized checklists</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Support Close Ones</h3>
                <p className="text-slate-600 mb-3">Step-by-step guidance tailored by country and religious practice to help navigate paperwork swiftly and respectfully.</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Clear steps with progress tracking</li>
                  <li>Region-specific permits and contacts</li>
                  <li>Premium tips and templates</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {view === 'guide' && (
          <>
          {/* Guide subtitle */}
          <div className="text-center mb-8 mt-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Death Paperwork Guide</h2>
            <p className="text-slate-600">Navigate requirements with compassionate, practical guidance.</p>
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

          {/* Afterlife Experiences (Legacy mode only) */}
          {view === 'guide' && isLegacyMode && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Crown className="w-6 h-6 text-amber-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-slate-800">Afterlife Experiences</h2>
                </div>
                <p className="text-slate-600 mb-4">Explore unconventional memorial options as part of planning your legacy.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {afterlifeExperiences.map((exp) => (
                    <button
                      key={exp}
                      onClick={() => setSelectedAfterlife(exp)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedAfterlife === exp
                          ? 'border-amber-500 bg-amber-50 text-amber-900'
                          : 'border-slate-200 hover:border-amber-300 hover:bg-amber-25'
                      }`}
                    >
                      <div className="font-medium">{exp}</div>
                    </button>
                  ))}
                </div>
                {selectedAfterlife && (
                  <div className="mt-4 text-sm text-slate-700">
                    Selected: <span className="font-medium">{selectedAfterlife}</span>
                  </div>
                )}
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPremiumOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-400/90 hover:bg-amber-400 text-slate-900 rounded-lg transition-colors duration-200 text-sm font-semibold shadow-sm"
                  >
                    <Crown className="w-4 h-4" />
                    {isPremiumActive ? 'Premium Active' : 'Premium'}
                  </button>
                  <button
                    onClick={() => { resetSelection(); setView('landing'); }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Change Selection
                  </button>
                </div>
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
                      {isPremiumActive && (
                        <div className="mt-2">
                          <button
                            className="text-xs font-medium text-amber-700 hover:text-amber-800 underline"
                            onClick={(e) => togglePremiumExpanded(index, e)}
                          >
                            {premiumExpanded.has(index) ? 'Hide details' : 'Expand details'}
                          </button>
                          {premiumExpanded.has(index) && (
                            <div className="mt-2 text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                              {renderUkIslamDetail(index) || getPremiumDetail(step)}
                            </div>
                          )}
                        </div>
                      )}
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
          </>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            This guide provides general information. Please consult with local authorities and professionals for specific requirements.
          </p>
        </div>
      </div>
    </div>
    {/* Premium Modal */}
    {isPremiumOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsPremiumOpen(false)}></div>
        <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-400 p-4 text-slate-900 flex items-center gap-2">
            <Crown className="w-5 h-5" />
            <h3 className="text-lg font-bold">Upgrade to Premium</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="text-slate-800 font-semibold">Monthly</div>
                <div className="text-2xl font-bold text-slate-900">$4.99</div>
                <div className="text-xs text-slate-500">per month</div>
              </div>
              <div className="rounded-xl border border-amber-300 p-4 bg-amber-50">
                <div className="text-slate-800 font-semibold">Yearly</div>
                <div className="text-2xl font-bold text-slate-900">$39.99</div>
                <div className="text-xs text-slate-600">save 33% vs monthly</div>
              </div>
            </div>
            <ul className="space-y-3 text-slate-700 mb-6 list-disc list-inside">
              <li>Save and resume your progress across sessions</li>
              <li>Download personalized paperwork checklists</li>
              <li>Access region-specific updates and guidance</li>
            </ul>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsPremiumOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm"
              >
                Not now
              </button>
              <button
                onClick={() => {
                  setIsPremiumActive(true);
                  setIsPremiumOpen(false);
                  window.alert('Congrats for your purchase, continue to keep your legacy!');
                }}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold transition-colors text-sm"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default App;
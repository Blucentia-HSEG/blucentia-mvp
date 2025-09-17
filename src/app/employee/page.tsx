'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { surveyQuestions, submitSurveyResponse, submitPledge } from '@/lib/mock/employees';
import { SurveyResponse } from '@/types';
import ContextualHelp from '@/components/navigation/ContextualHelp';
import RelatedActions from '@/components/navigation/RelatedActions';
import { Upload, FileText, X, CheckCircle, SkipForward } from 'lucide-react';

export default function EmployeeSurveyPage() {
  const [currentStep, setCurrentStep] = useState<'survey' | 'documents' | 'pledge' | 'complete'>('survey');
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  const [pledgeMessage, setPledgeMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [hasUploadedDocuments, setHasUploadedDocuments] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [employeeId] = useState('emp_new'); // Mock employee ID for new user

  const handleResponseChange = (questionId: string, answer: string | number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSurveySubmit = () => {
    const surveyResponses: SurveyResponse[] = Object.entries(responses).map(([questionId, answer]) => ({
      questionId,
      answer,
      timestamp: new Date()
    }));

    submitSurveyResponse(employeeId, surveyResponses);
    setCurrentStep('documents');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    setHasUploadedDocuments(true);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length === 1) {
      setHasUploadedDocuments(false);
    }
  };

  const handleDocumentsSubmit = () => {
    setCurrentStep('pledge');
  };

  const handleDocumentsSkip = () => {
    setCurrentStep('pledge');
  };

  const handlePledgeSubmit = () => {
    submitPledge(employeeId, pledgeMessage);
    setCurrentStep('complete');
  };

  const isSurveyComplete = () => {
    const requiredQuestions = surveyQuestions.filter(q => q.required);
    return requiredQuestions.every(q => responses[q.id] !== undefined);
  };

  const getTruthPointsEarned = () => {
    let points = 0;
    if (currentStep === 'documents') points += 50; // Survey completion
    if (currentStep === 'pledge') points += hasUploadedDocuments ? 100 : 50; // Survey + documents (if uploaded)
    if (currentStep === 'complete') points += hasUploadedDocuments ? 200 : 150; // Survey + documents + pledge
    return points;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <GlassCard delay={0.1} className="p-6">
            <div className="flex items-center justify-center space-x-4 lg:space-x-8">
              <div className={`flex items-center ${currentStep === 'survey' ? 'text-primary' : currentStep === 'documents' || currentStep === 'pledge' || currentStep === 'complete' ? 'text-accent' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep === 'survey' ? 'bg-primary text-white' : currentStep === 'documents' || currentStep === 'pledge' || currentStep === 'complete' ? 'bg-accent text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  1
                </div>
                <span className="ml-4 font-semibold text-sm lg:text-base">Survey</span>
              </div>
              <div className={`w-16 lg:w-24 h-1 rounded-full ${currentStep === 'documents' || currentStep === 'pledge' || currentStep === 'complete' ? 'bg-accent' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
              <div className={`flex items-center ${currentStep === 'documents' ? 'text-primary' : currentStep === 'pledge' || currentStep === 'complete' ? 'text-accent' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep === 'documents' ? 'bg-primary text-white' : currentStep === 'pledge' || currentStep === 'complete' ? 'bg-accent text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  2
                </div>
                <span className="ml-4 font-semibold text-sm lg:text-base">Documents</span>
              </div>
              <div className={`w-16 lg:w-24 h-1 rounded-full ${currentStep === 'pledge' || currentStep === 'complete' ? 'bg-accent' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
              <div className={`flex items-center ${currentStep === 'pledge' ? 'text-primary' : currentStep === 'complete' ? 'text-accent' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep === 'pledge' ? 'bg-primary text-white' : currentStep === 'complete' ? 'bg-accent text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  3
                </div>
                <span className="ml-4 font-semibold text-sm lg:text-base">Pledge</span>
              </div>
              <div className={`w-16 lg:w-24 h-1 rounded-full ${currentStep === 'complete' ? 'bg-accent' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
              <div className={`flex items-center ${currentStep === 'complete' ? 'text-accent' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep === 'complete' ? 'bg-accent text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  4
                </div>
                <span className="ml-4 font-semibold text-sm lg:text-base">Complete</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contextual Help */}
        <div>
          <ContextualHelp page="employee" />
        </div>

        {/* Survey Step */}
        {currentStep === 'survey' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard delay={0.2} className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">Transparency Survey</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Help us understand your company's transparency practices. Your responses are anonymous and will contribute to our movement for corporate accountability.
                </p>
              </div>
              <div className="space-y-8">
                {surveyQuestions.map((question) => (
                  <div key={question.id} className="space-y-4">
                    <label className="block text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                      {question.text}
                      {question.required && <span className="text-red-500 dark:text-red-400 ml-2">*</span>}
                    </label>
                  
                    {question.type === 'scale' && (
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                          <span>1 - Poor</span>
                          <span>10 - Excellent</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={responses[question.id] || 5}
                          onChange={(e) => handleResponseChange(question.id, parseInt(e.target.value))}
                          className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-xl appearance-none cursor-pointer"
                        />
                        <div className="text-center text-lg font-bold text-primary">
                          {responses[question.id] || 5}
                        </div>
                      </div>
                    )}
                  
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="space-y-3">
                        {question.options.map((option) => (
                          <label key={option} className="flex items-center p-4 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              checked={responses[question.id] === option}
                              onChange={(e) => handleResponseChange(question.id, e.target.value)}
                              className="mr-4 w-4 h-4"
                            />
                            <span className="text-slate-700 dark:text-slate-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'text' && (
                      <textarea
                        value={responses[question.id] || ''}
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 dark:text-slate-300 resize-none bg-white/50 dark:bg-slate-800/50"
                        rows={4}
                      />
                    )}
                    
                    <Badge variant="outline" className="text-sm">
                      {question.category}
                    </Badge>
                  </div>
                ))}
              
                <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                  <Button 
                    onClick={handleSurveySubmit}
                    disabled={!isSurveyComplete()}
                    className="w-full btn-primary"
                  >
                    Complete Survey (+50 Truth Points)
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Document Upload Step */}
        {currentStep === 'documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard delay={0.2} className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">Upload Supporting Documents</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Share documents that demonstrate your company's transparency practices. This is optional but will earn you an additional 50 Truth Points!
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Survey Completion Bonus */}
                <div className="bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-700 rounded-xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-green-600 dark:text-green-400 font-bold text-xl">+50 Truth Points</div>
                      <span className="status-success">Survey Complete</span>
                      <p className="text-green-700 dark:text-green-300 text-sm mt-1">You've successfully completed the transparency survey!</p>
                    </div>
                  </div>
                </div>

                {/* File Upload Area */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-primary dark:hover:border-primary transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                          Upload Supporting Documents
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          Drag and drop files here, or click to browse
                        </p>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="bg-white/50 dark:bg-slate-800/50"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Supported formats: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG (Max 10MB each)
                      </p>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Uploaded Files:</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-slate-500" />
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{file.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => removeFile(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bonus Points Info */}
                  {hasUploadedDocuments && (
                    <div className="bg-gradient-to-r from-amber-50 to-amber-50/50 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">+50</span>
                        </div>
                        <div>
                          <p className="font-medium text-amber-800 dark:text-amber-300">Bonus Points Earned!</p>
                          <p className="text-sm text-amber-700 dark:text-amber-400">You'll receive an additional 50 Truth Points for uploading documents</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleDocumentsSubmit}
                      className="flex-1 btn-primary"
                    >
                      {hasUploadedDocuments ? 'Upload (+50 points)' : 'Continue without Documents'}
                    </Button>
                    <Button
                      onClick={handleDocumentsSkip}
                      variant="outline"
                      className="flex-1"
                    >
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip This Step
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Pledge Step */}
        {currentStep === 'pledge' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard delay={0.2} className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">Make Your Pledge</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  {hasUploadedDocuments 
                    ? "Congratulations! You've earned 100 Truth Points for completing the survey and uploading documents. Now make a public pledge to support transparency in your workplace and join the movement."
                    : "Congratulations! You've earned 50 Truth Points for completing the survey. Now make a public pledge to support transparency in your workplace and join the movement."
                  }
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-700 rounded-xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <div className="text-green-600 dark:text-green-400 font-bold text-xl">
                        +{hasUploadedDocuments ? '100' : '50'} Truth Points
                      </div>
                      <span className="status-success">
                        {hasUploadedDocuments ? 'Survey + Documents Complete' : 'Survey Complete'}
                      </span>
                      <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                        {hasUploadedDocuments 
                          ? "You've successfully completed the survey and uploaded supporting documents!"
                          : "You've successfully completed the transparency survey!"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Pledge Message (Optional)
                  </label>
                  <textarea
                    value={pledgeMessage}
                    onChange={(e) => setPledgeMessage(e.target.value)}
                    placeholder="Share your commitment to transparency in your workplace..."
                    className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50"
                    rows={4}
                  />
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-3">What happens when you pledge?</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                    <li>• Your pledge will be counted in our movement statistics</li>
                    <li>• You'll earn 100 additional Truth Points</li>
                    <li>• Your company's transparency score will improve</li>
                    <li>• You'll join thousands of employees committed to change</li>
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <Button 
                    onClick={handlePledgeSubmit}
                    className="w-full btn-accent-lg"
                  >
                    Make My Pledge (+100 Truth Points)
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard delay={0.2} className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">🎉 Welcome to the Movement!</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  You've successfully joined the transparency movement and made a difference. Your commitment to ethical business practices is now part of the global change.
                </p>
              </div>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border border-accent/30 dark:border-accent/50 rounded-xl p-8">
                    <div className="text-4xl font-bold text-accent mb-3">
                      +{hasUploadedDocuments ? '200' : '150'} Truth Points
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Total earned from {hasUploadedDocuments ? 'survey, documents, and pledge' : 'survey and pledge'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                    <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-3">Your Impact</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                      <li>✓ Completed transparency survey</li>
                      {hasUploadedDocuments && <li>✓ Uploaded supporting documents</li>}
                      <li>✓ Made public pledge</li>
                      <li>✓ Earned {hasUploadedDocuments ? '200' : '150'} Truth Points</li>
                      <li>✓ Joined the movement</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6">
                    <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-3">Next Steps</h4>
                    <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-2">
                      <li>• Share with colleagues</li>
                      <li>• Check company dashboard</li>
                      <li>• Join affiliate program</li>
                      <li>• Stay updated on progress</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/company" className="flex-1 btn-primary text-center">
                      View Company Dashboard
                    </a>
                    <a href="/affiliate" className="flex-1 btn-secondary text-center">
                      Join Affiliate Program
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Related Actions */}
        {currentStep === 'complete' && (
          <div className="mt-8">
            <RelatedActions currentPage="employee" />
          </div>
        )}
      </div>
    </div>
  );
}

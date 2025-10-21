import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage?: string;
  coverColor: string;
  type: 'textbook' | 'pdf' | 'external';
  courseId?: number;
  pdfUrl?: string;
  bookId?: string;
}

interface BookshelfViewProps {
  books: Book[];
  onBookClick: (book: Book) => void;
  onRemoveBook?: (bookId: string) => void;
}

export default function BookshelfView({ books, onBookClick, onRemoveBook }: BookshelfViewProps) {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  // Safety check for undefined books
  const safeBooks = books || [];

  return (
    <div className="space-y-6">

      <div className="bg-gradient-to-b from-amber-900/20 to-amber-800/10 p-6 rounded-lg">
        <div className="flex items-center mb-6">
          <i className="fas fa-books text-2xl text-amber-600 mr-3"></i>
          <h3 className="text-xl font-semibold text-white">Your Personal Bookshelf</h3>
        </div>

      {safeBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-8">
            <i className="fas fa-bookmark text-4xl text-amber-400 mb-4"></i>
            <p className="text-amber-200">Your bookshelf is empty. Add books to start building your collection.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Bookshelf Top */}
          <div className="mb-4 h-4 bg-gradient-to-r from-amber-800 to-amber-700 rounded-t-lg shadow-lg border-b border-amber-600"></div>
          
          <div className="flex flex-wrap justify-start gap-1">
          {safeBooks.map((book, index) => {
            // Individual book spine colors for realistic variety
            const bookSpineColors = [
              'bg-gradient-to-b from-red-800 to-red-950 border-red-700', // Deep red
              'bg-gradient-to-b from-blue-800 to-blue-950 border-blue-700', // Navy blue
              'bg-gradient-to-b from-green-800 to-green-950 border-green-700', // Forest green
              'bg-gradient-to-b from-purple-800 to-purple-950 border-purple-700', // Royal purple
              'bg-gradient-to-b from-amber-800 to-amber-950 border-amber-700', // Golden brown
              'bg-gradient-to-b from-slate-800 to-slate-950 border-slate-700', // Charcoal
              'bg-gradient-to-b from-teal-800 to-teal-950 border-teal-700', // Deep teal
              'bg-gradient-to-b from-orange-800 to-orange-950 border-orange-700', // Burnt orange
              'bg-gradient-to-b from-indigo-800 to-indigo-950 border-indigo-700' // Midnight blue
            ];

            const spineColor = bookSpineColors[index % bookSpineColors.length];

            return (
              <React.Fragment key={`book-${book.id}-${index}`}>
                {/* Mobile shelf divider after 6 books */}
                {index === 6 && safeBooks.length > 6 && (
                  <div className="w-full md:hidden h-3 bg-gradient-to-r from-amber-800 to-amber-700 border-t border-amber-600 my-2 rounded-sm shadow-inner"></div>
                )}
                
                <div
                  className="relative group"
                  onMouseEnter={() => setHoveredBook(book.id)}
                  onMouseLeave={() => setHoveredBook(null)}
                >
                {/* Realistic Book Spine */}
                <div 
                  className={`
                    h-64 w-11 cursor-pointer transition-all duration-300 transform
                    ${hoveredBook === book.id ? 'scale-105 shadow-xl' : 'shadow-lg'}
                    ${spineColor} border-2 rounded-sm
                    hover:shadow-2xl relative overflow-hidden
                  `}
                  style={{
                    boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.3), inset -2px 0 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.4)',
                    background: `${spineColor.includes('red') ? 'linear-gradient(to right, #7f1d1d, #991b1b, #7f1d1d)' :
                                spineColor.includes('blue') ? 'linear-gradient(to right, #1e3a8a, #1d4ed8, #1e3a8a)' :
                                spineColor.includes('green') ? 'linear-gradient(to right, #14532d, #15803d, #14532d)' :
                                spineColor.includes('purple') ? 'linear-gradient(to right, #581c87, #6b21a8, #581c87)' :
                                spineColor.includes('amber') ? 'linear-gradient(to right, #92400e, #b45309, #92400e)' :
                                spineColor.includes('slate') ? 'linear-gradient(to right, #1e293b, #334155, #1e293b)' :
                                spineColor.includes('teal') ? 'linear-gradient(to right, #134e4a, #0f766e, #134e4a)' :
                                spineColor.includes('orange') ? 'linear-gradient(to right, #9a3412, #c2410c, #9a3412)' :
                                'linear-gradient(to right, #312e81, #3730a3, #312e81)'
                                }`
                  }}
                  onClick={() => onBookClick(book)}
                >
                  {/* Book Spine Content */}
                  <div className="p-1 h-full flex flex-col relative">
                    {/* Book spine ridges for depth */}
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-black/30"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-px bg-white/20"></div>
                    
                    {/* Spine text container */}
                    <div className="absolute inset-0 flex items-center justify-center py-3">
                      <div className="flex flex-col items-center justify-center h-full space-y-2">
                        {/* Title - vertical reading bottom to top */}
                        <div 
                          className="font-bold text-yellow-300 text-center"
                          style={{ 
                            writingMode: 'vertical-rl', 
                            textOrientation: 'mixed',
                            letterSpacing: '0.1em',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            fontSize: '10px',
                            lineHeight: '1.1',
                            transform: 'rotate(180deg)',
                            maxHeight: '180px',
                            overflow: 'hidden'
                          }}
                        >
                          {book?.title?.toUpperCase() || 'UNKNOWN TITLE'}
                        </div>

                        {/* Author - smaller text above title */}
                        <div 
                          className="font-medium text-yellow-200/80 text-center"
                          style={{ 
                            writingMode: 'vertical-rl', 
                            textOrientation: 'mixed',
                            letterSpacing: '0.05em',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                            fontSize: '8px',
                            transform: 'rotate(180deg)',
                            maxHeight: '60px',
                            overflow: 'hidden'
                          }}
                        >
                          {book?.author?.toUpperCase() || ''}
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative spine elements */}
                    <div className="absolute top-4 left-1 right-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-1 right-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent"></div>
                  </div>
                </div>

              {/* Hover Tooltip */}
              {hoveredBook === book.id && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-black/90 text-white text-xs p-2 rounded whitespace-nowrap">
                    <div className="font-semibold">{book?.title || 'Unknown Title'}</div>
                    <div className="text-gray-300">by {book?.author || 'Unknown Author'}</div>
                    <div className="text-amber-300">{book?.category || 'Unknown Category'}</div>
                    <div className="text-center mt-1">
                      {book.type === 'pdf' ? (
                        <span className="text-green-300">Click to read PDF</span>
                      ) : book.type === 'textbook' ? (
                        <span className="text-blue-300">Click to read textbook</span>
                      ) : (
                        <span className="text-gray-300">Click to buy on Amazon</span>
                      )}
                    </div>
                    {/* Arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              )}

              {/* Remove button for non-textbooks */}
              {book.type !== 'textbook' && onRemoveBook && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-40"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBook(book.id);
                  }}
                >
                  <i className="fas fa-times text-xs"></i>
                </Button>
              )}
                </div>
              </React.Fragment>
            );
          })}
          </div>
          
          {/* Bookshelf Base */}
          <div className="mt-4 h-4 bg-gradient-to-r from-amber-800 to-amber-700 rounded-b-lg shadow-lg border-t border-amber-600"></div>
        </>
      )}
      </div>
    </div>
  );
}
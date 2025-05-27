"use client";

/**
 * [2025-05-26] Awaiting Shipment List Page
 * This page displays all shipments with filterable tabs for different status types.
 * Provides a professional UI matching the design requirements with status cards and searchable table.
 * -- Cascade AI
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, PackageCheck, Filter, Calendar } from "lucide-react";
// Removed the useAwaitingShipments import since we're now handling the data fetching ourselves

/**
 * ShipmentHistoryPage component
 * Displays a professional awaiting shipment list page with:
 * - Status filter tabs with counts
 * - Search functionality with filters
 * - Detailed shipment information table
 */
export default function ShipmentHistoryPage() {
  /**
   * Define the ShipmentType interface to ensure type safety and consistency
   * This defines the exact structure our data should have, making it easy to
   * swap in real API data later that follows this same structure
   */
  interface ShipmentType {
    id: string;         // Tracking/shipment ID
    date: string;      // Formatted date string
    destination: string; // Destination location
    recipient: string;  // Name of recipient
    type: string;      // Type of shipment (Box, Document, etc.)
    status: string;    // Current status (pending, delivered, etc.)
  }

  /**
   * For now we're using dummy data, but this function mimics an API call
   * In the future, replace this with a real API fetch and format the data
   * into the ShipmentType interface structure
   * @returns {Promise<ShipmentType[]>} A promise that resolves to an array of shipments
   */
  const fetchShipments = async (): Promise<ShipmentType[]> => {
    // In a real implementation, we would call an API endpoint like this:
    // const response = await fetch('/api/shipments');
    // const data = await response.json();
    // return data.map(item => ({
    //   id: item.trackingId,
    //   date: new Date(item.createdAt).toLocaleDateString(),
    //   destination: item.destinationAddress,
    //   recipient: item.recipientName,
    //   type: item.packageType,
    //   status: item.currentStatus.toLowerCase()
    // }));
    
    // For now, return static dummy data that matches our UI
    return [
      {
        id: "SHIP2132",
        date: "Feb 18, 2025",
        destination: "Washington, DC",
        recipient: "James Simmons",
        type: "Box",
        status: "pending"
      },
      {
        id: "SHIP2132",
        date: "Feb 17 2025",
        destination: "Philadelphia, PA",
        recipient: "Shirely Wong",
        type: "parcel",
        status: "delivered"
      },
      {
        id: "SHIP2132",
        date: "Feb 10, 2025",
        destination: "Dallas, TX",
        recipient: "Nicholas Anderson",
        type: "Box",
        status: "transit"
      },
      {
        id: "SHIP2132",
        date: "Jan 28, 2025",
        destination: "Washington, DC",
        recipient: "Joseph Smith",
        type: "parcel",
        status: "received"
      },
      {
        id: "SHIP2132",
        date: "Jan 18, 2025",
        destination: "Las Vegas, NV",
        recipient: "Dorothy Gray",
        type: "Document",
        status: "arrived"
      },
      {
        id: "SHIP2132",
        date: "Dec 28, 2025",
        destination: "Minneapolis, MN",
        recipient: "Robert King",
        type: "parcel",
        status: "received"
      },
      {
        id: "SHIP2132",
        date: "Nov 7, 2025",
        destination: "Boston, MA",
        recipient: "Kimberly Martin",
        type: "Document",
        status: "arrived"
      }
    ];
  };

  /**
   * Application state variables
   * - shipments: The main data array that will come from the API in the future
   * - loading: Tracks the API loading state
   * - error: Stores any error messages from API calls
   * - activeTab: The currently selected filter tab
   * - searchQuery: The current search input value
   * - currentPage: Current page number for pagination
   * - itemsPerPage: Number of items to display per page
   * - dateFilterOpen: Tracks if the date filter dropdown is open
   * - startDate/endDate: Date range for filtering
   */
  const [shipments, setShipments] = useState<ShipmentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Fixed at 10 items per page to match the design
  const [dateFilterOpen, setDateFilterOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dateFilterActive, setDateFilterActive] = useState<boolean>(false);
  
  // Reference to the date filter button for positioning the dropdown
  const dateFilterButtonRef = useRef<HTMLButtonElement>(null);
  const dateFilterDropdownRef = useRef<HTMLDivElement>(null);
  
  // Add CSS animations for the date filter dropdown
  useEffect(() => {
    // Create a stylesheet for our animations if it doesn't exist
    if (!document.getElementById('date-filter-animations')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'date-filter-animations';
      styleSheet.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);
  
  // Handle positioning and outside clicks for the date filter dropdown
  useEffect(() => {
    // Function to position the dropdown correctly with responsive design
    function positionDropdown() {
      if (dateFilterOpen && dateFilterButtonRef.current && dateFilterDropdownRef.current) {
        const buttonRect = dateFilterButtonRef.current.getBoundingClientRect();
        const dropdownElem = dateFilterDropdownRef.current;
        const isMobile = window.innerWidth < 640; // sm breakpoint in Tailwind
        
        // Position differently for mobile and desktop
        if (isMobile) {
          // Mobile: Center in the screen
          const viewportWidth = window.innerWidth;
          const dropdownWidth = Math.min(viewportWidth * 0.9, 360); // 90% of viewport or max 360px
          
          dropdownElem.style.position = 'fixed';
          dropdownElem.style.top = '50%';
          dropdownElem.style.left = '50%';
          dropdownElem.style.transform = 'translate(-50%, -50%)';
          dropdownElem.style.maxHeight = '80vh';
          dropdownElem.style.overflowY = 'auto';
          dropdownElem.style.width = `${dropdownWidth}px`;
          dropdownElem.style.zIndex = '9999';
        } else {
          // Desktop: Position relative to the button
          dropdownElem.style.position = 'absolute';
          dropdownElem.style.top = `${buttonRect.height + 8}px`;
          dropdownElem.style.right = '0';
          dropdownElem.style.transform = 'none';
          dropdownElem.style.zIndex = '9999';
          
          // Ensure the dropdown is fully visible within the viewport
          const dropdownRect = dropdownElem.getBoundingClientRect();
          
          // Check if dropdown extends beyond the bottom of the viewport
          if (dropdownRect.bottom > window.innerHeight) {
            // Position above the button instead if there's not enough space below
            const spaceAbove = buttonRect.top;
            const dropdownHeight = dropdownRect.height;
            
            if (spaceAbove > dropdownHeight + 40) { // Add extra margin for better visibility
              // Position above if there's enough space
              dropdownElem.style.top = 'auto';
              dropdownElem.style.bottom = `${buttonRect.height + 8}px`;
            }
          }
        }
      }
    }
    
    // Function to handle clicks outside the dropdown
    function handleClickOutside(event: MouseEvent) {
      if (dateFilterOpen && 
          dateFilterButtonRef.current && 
          dateFilterDropdownRef.current && 
          !dateFilterButtonRef.current.contains(event.target as Node) && 
          !dateFilterDropdownRef.current.contains(event.target as Node)) {
        // Close the dropdown when clicking outside
        setDateFilterOpen(false);
      }
    }
    
    // Position immediately when dropdown opens
    positionDropdown();
    
    // Add event listeners
    window.addEventListener('resize', positionDropdown);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', positionDropdown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dateFilterOpen]);
  
  // Handle Escape key to close the dropdown
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && dateFilterOpen) {
        setDateFilterOpen(false);
      }
    }
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [dateFilterOpen]);

  /**
   * Fetch shipment data when component mounts
   * This pattern makes it easy to replace with real API calls in the future:
   * 1. Set loading state
   * 2. Make the API call
   * 3. Handle success by updating state
   * 4. Handle errors appropriately
   * 5. Always turn off loading state when done
   */
  useEffect(() => {
    // Create an async function to fetch the data
    const getShipments = async () => {
      try {
        // Set loading state to true at the start of the request
        setLoading(true);
        
        // In the future, this will be a real API call
        // For now, we use our dummy data function
        const data = await fetchShipments();
        
        // Update the shipments state with the fetched data
        setShipments(data);
        
        // Clear any previous errors
        setError(null);
      } catch (err) {
        // Log the error to the console for debugging
        console.error('Error fetching shipments:', err);
        
        // Set a user-friendly error message
        setError('Failed to load shipments. Please try again later.');
      } finally {
        // Always turn off loading state when done, whether successful or not
        setLoading(false);
      }
    };

    // Call the function immediately
    getShipments();
  }, []);

  // Define all possible shipment statuses
  const statuses = {
    all: "All Shipments",
    pending: "Pending",
    delivered: "Delivered",
    arrived: "Arrived",
    received: "Received",
    transit: "In Transit"
  };

  /**
   * Calculate counts for each status based on the current shipments data
   * This will automatically update when the shipments data changes
   */
  const counts = useMemo(() => {
    // If still loading or there's an error, return the static counts for UI
    if (loading || error || shipments.length === 0) {
      return {
        all: 7,
        pending: 1,
        delivered: 1,
        arrived: 2,
        received: 2,
        transit: 1
      };
    }
    
    // Otherwise, calculate the real counts from the data
    return {
      all: shipments.length,
      pending: shipments.filter(s => s.status === "pending").length,
      delivered: shipments.filter(s => s.status === "delivered").length,
      arrived: shipments.filter(s => s.status === "arrived").length,
      received: shipments.filter(s => s.status === "received").length,
      transit: shipments.filter(s => s.status === "transit").length,
    };
  }, [shipments, loading, error]);

  /**
   * Helper function to parse dates and handle potential invalid formats
   * @param {string} dateString - Date string to be parsed 
   * @returns {Date | null} - Parsed Date object or null if invalid
   */
  const parseDate = (dateString: string): Date | null => {
    // If no date string provided, return null
    if (!dateString) return null;
    
    // Create a new Date object from the string
    const date = new Date(dateString);
    
    // Check if date is valid (invalid dates return NaN for getTime())
    return isNaN(date.getTime()) ? null : date;
  };

  /**
   * Filter shipments based on active tab, search query, and date range
   * This implements a layered filtering approach for maximum flexibility
   * @returns {ShipmentType[]} Filtered array of shipments based on current filters
   */
  const filteredShipments = useMemo(() => {
    // Step 1: Apply status filter - show all or only those matching the selected status
    const statusFiltered = activeTab === "all" 
      ? shipments 
      : shipments.filter(s => s.status === activeTab);
    
    // Step 2: Apply search filter if there's a search query
    let searchFiltered = statusFiltered;
    if (searchQuery) {
      // Convert query to lowercase for case-insensitive matching
      const query = searchQuery.toLowerCase();
      
      // Filter shipments that match the search query on ID, destination, or recipient
      searchFiltered = statusFiltered.filter(shipment => 
        shipment.id.toLowerCase().includes(query) || 
        shipment.destination.toLowerCase().includes(query) ||
        shipment.recipient.toLowerCase().includes(query)
      );
    }
    
    // Step 3: Apply date filter if active
    if (dateFilterActive && startDate && endDate) {
      // Parse the start and end dates
      const parsedStartDate = parseDate(startDate);
      const parsedEndDate = parseDate(endDate);
      
      // If we have valid dates, filter by them
      if (parsedStartDate && parsedEndDate) {
        // Set end date to end of day to include the entire end date
        parsedEndDate.setHours(23, 59, 59, 999);
        
        return searchFiltered.filter(shipment => {
          // Parse the shipment date
          const shipmentDate = new Date(shipment.date);
          
          // Check if the shipment date is within the selected range
          return shipmentDate >= parsedStartDate && shipmentDate <= parsedEndDate;
        });
      }
    }
    
    // Return filtered shipments
    return searchFiltered;
  }, [shipments, activeTab, searchQuery, dateFilterActive, startDate, endDate]);
  
  /**
   * Calculate pagination values based on filtered shipments and current page
   * This handles all the pagination logic in one place
   * @returns {Object} Pagination metadata and current page items
   */
  const paginationData = useMemo(() => {
    // Calculate total number of pages based on filtered items and items per page
    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
    
    // Ensure current page is within valid range
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
    
    // If current page changed during calculation, update it
    if (validCurrentPage !== currentPage) {
      setCurrentPage(validCurrentPage);
    }
    
    // Calculate indices for slicing the array
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredShipments.length);
    
    // Get the current page items using slice
    const currentItems = filteredShipments.slice(startIndex, endIndex);
    
    // Generate page numbers for pagination controls
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      // Show up to 5 page numbers around the current page
      if (
        i === 1 ||
        i === totalPages ||
        (i >= validCurrentPage - 2 && i <= validCurrentPage + 2)
      ) {
        pageNumbers.push(i);
      }
    }
    
    // Return all calculated pagination data
    return {
      totalItems: filteredShipments.length,
      totalPages,
      currentPage: validCurrentPage,
      pageNumbers,
      currentItems,
      startIndex,
      endIndex,
      // Helper functions for pagination controls
      hasPreviousPage: validCurrentPage > 1,
      hasNextPage: validCurrentPage < totalPages
    };
  }, [filteredShipments, currentPage, itemsPerPage]);
  
  /**
   * Handle page change when user clicks pagination controls
   * @param {number} pageNumber The page number to navigate to
   */
  const handlePageChange = (pageNumber: number) => {
    // Scroll to top of table for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update current page
    setCurrentPage(pageNumber);
  };

  /**
   * Returns the appropriate CSS classes for a status badge based on status
   * Each status has a specific color scheme to match the design in the image
   * @param status - The shipment status string
   * @returns A string of CSS classes for the badge
   */
  const getStatusBadge = (status: string): string => {
    // Common styling for all badges
    const baseStyles = "px-2 py-1 rounded-full text-xs font-medium";
    
    // Status-specific styling
    switch (status) {
      case "pending":
        // Yellow background with darker yellow text for pending status
        return `${baseStyles} bg-yellow-100 text-yellow-800`;
      case "delivered":
        // Green background with darker green text for delivered status
        return `${baseStyles} bg-green-100 text-green-800`;
      case "arrived":
        // Green background with darker green text for arrived status
        return `${baseStyles} bg-green-100 text-green-800`;
      case "received":
        // Blue background with darker blue text for received status
        return `${baseStyles} bg-blue-100 text-blue-800`;
      case "transit":
        // Blue background with darker blue text for in transit status
        return `${baseStyles} bg-blue-100 text-blue-800`;
      default:
        // Gray fallback for any unrecognized status
        return `${baseStyles} bg-gray-100 text-gray-800`;
    }
  };

  // Get status icon color
  const getStatusIconColor = (status: string) => {
    switch (status) {
      case "all": return "text-yellow-500";
      case "pending": return "text-yellow-500";
      case "delivered": return "text-yellow-500";
      case "arrived": return "text-yellow-500";
      case "received": return "text-blue-500";
      case "transit": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen py-6 bg-gray-100 transition-colors duration-300">
      {/* Page Header */}
      <div className="mb-4 px-4 sm:px-10">
        <h1 className="text-2xl font-bold text-gray-900">Awaiting Shipment List</h1>
        <p className="text-sm text-gray-500">Shipments that are being processed</p>
      </div>

      {/* Status Tabs with Counts - Fully Responsive Grid Layout */}
      <div className="relative mb-6">
        
        {/* Responsive grid container for status tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-8 lg:px-10 pb-2">
          {Object.entries(statuses).map(([key, label]) => (
            <div 
              key={key} 
              className={`bg-white shadow rounded-lg overflow-hidden cursor-pointer transition-all duration-200 h-full ${activeTab === key ? 'ring-2 ring-offset-1 ring-blue-500' : 'hover:bg-gray-50'}`}
              onClick={() => setActiveTab(key)}
            >
              <div className="p-3 sm:p-4 flex flex-col justify-between h-full">
                <div className="mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{label}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  {/* SVG Hexagon Icon - Yellow for All/Pending/Delivered/Arrived, Blue for Received/Transit */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none" className="flex-shrink-0 sm:w-5 sm:h-5 md:w-6 md:h-6">
                    <path d="M22.9125 6.36187L13.975 1.46961C13.6763 1.30522 13.3409 1.21902 13 1.21902C12.6591 1.21902 12.3237 1.30522 12.025 1.46961L3.0875 6.36187C2.7677 6.53686 2.50088 6.79468 2.31503 7.10829C2.12919 7.4219 2.03117 7.77975 2.03125 8.1443V17.8557C2.03117 18.2202 2.12919 18.5781 2.31503 18.8917C2.50088 19.2053 2.7677 19.4631 3.0875 19.6381L12.025 24.5304C12.3236 24.695 12.659 24.7813 13 24.7813C13.341 24.7813 13.6764 24.695 13.975 24.5304L22.9125 19.6381C23.2323 19.4631 23.4991 19.2053 23.685 18.8917C23.8708 18.5781 23.9688 18.2202 23.9688 17.8557V8.1443C23.9688 7.77975 23.8708 7.4219 23.685 7.10829C23.4991 6.79468 23.2323 6.53686 22.9125 6.36187ZM13 3.71414L20.3125 7.71875L18.136 8.91008L10.8235 4.90648L13 3.71414ZM13 11.7203L5.6875 7.71875L8.28344 6.29687L15.5959 10.2995L13 11.7203ZM4.46875 9.83023L11.7812 13.8318V21.6186L4.46875 17.615V9.83023ZM14.2188 21.6186V13.8318L16.6562 12.4983V15.4375C16.6562 15.7607 16.7847 16.0707 17.0132 16.2993C17.2418 16.5278 17.5518 16.6562 17.875 16.6562C18.1982 16.6562 18.5082 16.5278 18.7368 16.2993C18.9653 16.0707 19.0938 15.7607 19.0938 15.4375V11.1637L21.5312 9.83023V17.615L14.2188 21.6186Z" 
                      fill={key === "received" || key === "transit" ? "#3B82F6" : "#FACC15"} 
                    />
                  </svg>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold ml-2">{counts[key as keyof typeof counts]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Main Content Area - Search and Table */}
      <div className="px-4 sm:px-10">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Search and Filter Section */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Shipment ID or destination"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Date Filter Functionality with Responsive Dropdown */}
            <div className="relative flex items-center w-full sm:w-auto">
              <button 
                ref={dateFilterButtonRef}
                className={`flex items-center justify-center space-x-1 px-3 py-2 border ${dateFilterActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} rounded-md hover:bg-gray-50 w-full sm:w-auto`}
                onClick={() => setDateFilterOpen(!dateFilterOpen)}
                aria-expanded={dateFilterOpen}
                aria-haspopup="true"
              >
                <Calendar size={16} className={dateFilterActive ? "text-blue-500" : "text-gray-500"} />
                <span className="text-sm ml-1 hidden sm:inline">
                  {dateFilterActive 
                    ? `${startDate} - ${endDate}` 
                    : "Filter by date"}
                </span>
                <span className="text-sm ml-1 inline sm:hidden">
                  {dateFilterActive 
                    ? "Date Range" 
                    : "Date"}
                </span>
                <span className="ml-1">{dateFilterOpen ? "▲" : "▼"}</span>
              </button>
              
              {/* Semi-transparent backdrop for the date filter dropdown */}
              {dateFilterOpen && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-200 ease-in-out"
                  style={{ animation: 'fadeIn 150ms ease-in-out' }}
                  onClick={() => setDateFilterOpen(false)}
                />
              )}
              
              {/* Date Picker Dropdown - Enhanced with positioning and animations */}
              {dateFilterOpen && (
                <div 
                  ref={dateFilterDropdownRef}
                  className="fixed sm:absolute w-[90vw] sm:w-72 max-w-[360px] bg-white border border-gray-300 rounded-md shadow-xl p-4 transition-all duration-200 ease-in-out z-50"
                  style={{ animation: 'slideIn 200ms ease-out' }}
                >
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Filter shipments by date range</h3>
                    
                    {/* Start Date - Mobile Optimized */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="start-date" className="text-xs sm:text-sm font-medium text-gray-700">Start Date</label>
                      <input 
                        id="start-date"
                        type="date" 
                        className="border border-gray-300 rounded-md p-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    
                    {/* End Date - Mobile Optimized */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="end-date" className="text-xs sm:text-sm font-medium text-gray-700">End Date</label>
                      <input 
                        id="end-date"
                        type="date" 
                        className="border border-gray-300 rounded-md p-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    
                    {/* Action Buttons - Touch-friendly for mobile */}
                    <div className="flex justify-between pt-4 gap-3">
                      <button 
                        className="flex-1 border border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                          setDateFilterActive(false);
                          setDateFilterOpen(false);
                        }}
                      >
                        Clear
                      </button>
                      <button 
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                          if (startDate && endDate) {
                            setDateFilterActive(true);
                            setDateFilterOpen(false);
                            // Reset to first page when applying a new filter
                            setCurrentPage(1);
                          }
                        }}
                        disabled={!startDate || !endDate}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Shipment Table with Loading, Error, and Empty States */}
          <div className="overflow-x-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600 font-medium">Loading shipments...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State - No Shipments */}
            {!loading && !error && filteredShipments.length === 0 && (
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No shipments found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab !== "all" ? "Try switching to a different status filter" : "No shipments match your search criteria"}
                </p>
                {searchQuery && (
                  <div className="mt-6">
                    <button
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Table - Only show when we have data and not in loading/error state */}
            {!loading && !error && paginationData.totalItems > 0 && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Display only the current page items using paginationData.currentItems */}
                  {paginationData.currentItems.map((shipment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {shipment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shipment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 25" fill="none" className="inline-block">
                              <path d="M5.252 10.4487L16.912 4.89671C18.612 4.08671 20.386 5.86171 19.577 7.56271L14.025 19.2217C13.266 20.8147 10.966 20.7167 10.346 19.0637L9.32 16.3247C9.21975 16.0575 9.06347 15.8148 8.86167 15.613C8.65986 15.4112 8.41721 15.255 8.15 15.1547L5.41 14.1277C3.758 13.5077 3.659 11.2077 5.252 10.4487Z" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          {shipment.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shipment.recipient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shipment.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(shipment.status)}>
                          {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {/* Functional Pagination Controls */}
            {!loading && !error && paginationData.totalItems > 0 && (
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{paginationData.startIndex + 1}</span> to <span className="font-medium">{paginationData.endIndex}</span> of{" "}
                      <span className="font-medium">{paginationData.totalItems}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      {/* Previous Page Button */}
                      <button
                        onClick={() => handlePageChange(paginationData.currentPage - 1)}
                        disabled={!paginationData.hasPreviousPage}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${paginationData.hasPreviousPage ? 'text-gray-500 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
                      >
                        <span className="sr-only">Previous</span>
                        &larr;
                      </button>
                      
                      {/* Page Number Buttons */}
                      {paginationData.pageNumbers.map((pageNum, idx) => {
                        // If there's a gap between page numbers, show ellipsis
                        const previousPage = paginationData.pageNumbers[idx - 1];
                        if (previousPage && pageNum - previousPage > 1) {
                          return (
                            <span key={`ellipsis-${pageNum}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              &hellip;
                            </span>
                          );
                        }
                        
                        // Page number button
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border ${pageNum === paginationData.currentPage ? 'bg-blue-50 border-blue-500 text-blue-600 z-10' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      {/* Next Page Button */}
                      <button
                        onClick={() => handlePageChange(paginationData.currentPage + 1)}
                        disabled={!paginationData.hasNextPage}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${paginationData.hasNextPage ? 'text-gray-500 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
                      >
                        <span className="sr-only">Next</span>
                        &rarr;
                      </button>
                    </nav>
                  </div>
                </div>
                
                {/* Mobile Pagination (Simplified) */}
                <div className="flex items-center justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(paginationData.currentPage - 1)}
                    disabled={!paginationData.hasPreviousPage}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${paginationData.hasPreviousPage ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    Previous
                  </button>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">{paginationData.currentPage}</span> of <span className="font-medium">{paginationData.totalPages}</span>
                  </div>
                  <button
                    onClick={() => handlePageChange(paginationData.currentPage + 1)}
                    disabled={!paginationData.hasNextPage}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${paginationData.hasNextPage ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

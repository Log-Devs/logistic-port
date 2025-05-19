import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { FixedSizeList as List } from 'react-window';
import { Clock, ArrowRight, ChevronRight } from "lucide-react";

// AwaitingShipment type definition (single source of truth; keep in sync with AwaitingShipmentDetail)
export interface AwaitingShipment {
    id: string | number; // Internal use only
    trackingCode: string; // Public tracking code (e.g., SHIP-7G9X2A)
    recipient: string;
    startLocation: string;
    destination: string;
    arrival: string;
    items: number;
    weight: string | number;
    status: string; // Must be one of SHIPMENT_STATUSES codes
}
// NOTE: This interface should be imported wherever shipment typing is needed to avoid duplication.
// id: Internal linear ID (not shown to users)
// trackingCode: Public, random, unguessable shipment tracking code (shown to users)
import { SHIPMENT_STATUSES } from '@/lib/logistics-statuses';
import { STATUS_COLOR_MAP } from '@/lib/status-color-map';
import AwaitingShipmentDetail from './AwaitingShipmentDetail'; // Modal for shipment details



// Props for the table component
// Props for the AwaitingShipmentTable component
export interface AwaitingShipmentTableProps {
    /**
     * Array of AwaitingShipment objects to display in the table.
     * This should be fetched from your API and passed as a prop.
     *
     * Note: Only 10 awaiting shipments are displayed per page (pageSize = 10).
     */
    awaitingShipments: AwaitingShipment[];
    /**
     * Optional loading state to show a loader while fetching data from API.
     */
    loading?: boolean;
    /**
     * Optional error message to display if fetching data fails.
     */
    error?: string;
}

/**
 * Custom React hook for fetching awaiting shipments from an API endpoint.
 * Handles loading, error, and data states. Returns a tuple for easy use in components.
 *
 * @param endpoint - The API endpoint to fetch awaiting shipments from.
 * @returns [data, loading, error]
 */
export function useAwaitingShipments(endpoint: string): [AwaitingShipment[], boolean, string | undefined] {
    const [data, setData] = React.useState<AwaitingShipment[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        setLoading(true);
        setError(undefined);
        fetch(endpoint)
            .then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then((json) => setData(json))
            .catch((e) => setError(typeof e?.message === 'string' ? e.message : 'Unknown error'))
            .finally(() => setLoading(false));
    }, [endpoint]);

    return [data, loading, error];
}

/**
 * AwaitingShipmentTable displays a paginated and virtualized table of shipments.
 * Uses @tanstack/react-table for table logic and react-window for virtualization.
 * Handles large datasets efficiently and follows clean code/OOP best practices.
 */
/**
 * AwaitingShipmentTable displays a paginated and virtualized table of shipments.
 * It is fully production-ready, robust to large datasets, API integration, errors, and loading states.
 *
 * @param awaitingShipments - Array of AwaitingShipment objects (from API or static)
 * @param loading - Optional loading state
 * @param error - Optional error message
 */
const AwaitingShipmentTable: React.FC<AwaitingShipmentTableProps> = ({ awaitingShipments, loading = false, error = undefined }) => {
    // Define columns for the table using useMemo for performance
    // Table columns definition: show trackingCode as 'Tracking Code' for users
    const columns = useMemo<ColumnDef<AwaitingShipment>[]>(
        () => [
            {
                header: 'Tracking Code',
                accessorKey: 'trackingCode',
                // Render the tracking code value in bold for emphasis and clarity
                cell: ({ getValue }) => (
                    <span className="font-bold">{getValue() as string}</span>
                ),
            },
            {
                header: 'Recipient',
                accessorKey: 'recipient',
            },
            {
                header: 'Route',
                id: 'route',
                cell: ({ row }) => (
                    <div className="flex items-center">
                        <span className="font-medium truncate">{row.original.startLocation}</span>
                        <ArrowRight className="mx-1 text-gray-700 dark:text-gray-200 flex-shrink-0" size={16} />
                        <span className="font-medium truncate">{row.original.destination}</span>
                    </div>
                ),
            },
            {
                header: 'Est. Arrival',
                accessorKey: 'arrival',
            },
            {
                header: 'Items',
                accessorKey: 'items',
            },
            {
                header: 'Weight',
                accessorKey: 'weight',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                // Render the status label with a tooltip for description, using SHIPMENT_STATUSES
                cell: ({ getValue }) => {
                    // Extract status code from row value
                    const statusCode = getValue() as string;
                    // Find the status object from SHIPMENT_STATUSES for label/description
                    const statusObj = SHIPMENT_STATUSES.find(s => s.code === statusCode);
                    // Fallbacks for unknown status
                    const label = statusObj ? statusObj.label : statusCode;
                    const description = statusObj ? statusObj.description : '';
                    // Use shared STATUS_COLOR_MAP for color classes, fallback to neutral if missing
                    const colorClass = STATUS_COLOR_MAP[statusCode] || 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
                    // Render status with color and tooltip
                    return (
                        <span
                            title={description}
                            className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap ${colorClass}`}
                        >
                            {label}
                        </span>
                    );
                },
            },
        ],
        []
    );

    // Pagination state
    const [pageIndex, setPageIndex] = useState(0);
    // Page size constant: only 10 awaiting shipments are shown per page for optimal UX and performance
    const pageSize = 10; // Only 10 shipments per page for optimal UX (see README for rationale)

    // Sort shipments so the latest (most recent arrival) comes first for best UX
    const sortedShipments = useMemo(() => {
        // Parse arrival as Date; fallback to string compare if invalid
        return [...awaitingShipments].sort((a, b) => {
            const dateA = new Date(a.arrival);
            const dateB = new Date(b.arrival);
            // If both are valid dates, sort descending
            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
                return dateB.getTime() - dateA.getTime();
            }
            // Fallback: string compare
            return String(b.arrival).localeCompare(String(a.arrival));
        });
    }, [awaitingShipments]);

    // Calculate paginated data from sorted shipments
    const paginatedData = useMemo(
        () => sortedShipments.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        [sortedShipments, pageIndex, pageSize]
    );

    // Shipment detail modal state
    const [selectedShipment, setSelectedShipment] = useState<AwaitingShipment | null>(null);

    // Table instance
    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Column widths in percentages - they must add up to 100%
    const columnWidths = ['10%', '18%', '22%', '14%', '10%', '12%', '14%'];
    // Render the AwaitingShipmentTable UI
    // Always return a single parent element (React Fragment) to satisfy JSX requirements
    return (
        <>
            <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-md py-8">
                {/* Loader UI for API fetching */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-10">
                        <Clock size={32} className="animate-spin text-primary mb-2" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Loading shipments...</span>
                    </div>
                )}
                {/* Error UI for API errors */}
                {error && !loading && (
                    <div className="text-center py-12 text-red-500 font-semibold">
                        {error}
                    </div>
                )}
                {!loading && !error && awaitingShipments && awaitingShipments.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Awaiting Shipment List</h1>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-sm py-2 sm:py-4 px-0 sm:px-10">
                            All shipments that are currently awaiting processing.
                        </p>

                        {/* Desktop View - Virtualized Table */}
                        <div className="hidden md:block overflow-hidden">
                            <div className="overflow-x-auto">
                                <div className="w-full min-w-[800px]">
                                    {/* Table Headers */}
                                    <div className="flex border-b border-gray-300 dark:border-slate-700 py-2 text-gray-400">
                                        {table.getFlatHeaders().map((header: any, i: number) => (
                                            <div
                                                key={header.id}
                                                className="font-semibold px-4 text-left"
                                                style={{ width: columnWidths[i] }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Virtualized Table Body */}
                                    <div style={{ height: `${Math.min(pageSize, paginatedData.length) * 64}px` }}>
                                        <List
                                            height={Math.min(pageSize, paginatedData.length) * 64}
                                            itemCount={paginatedData.length}
                                            itemSize={64}
                                            width="100%"
                                            itemData={{ table, columnWidths, onRowClick: setSelectedShipment }}
                                        >
                                            {({ index, style, data }) => {
                                                const { table, columnWidths, onRowClick } = data;
                                                const row = table.getRowModel().rows[index];
                                                if (!row) return null;
                                                return (
                                                    <div
                                                        className="flex border-b border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors items-center cursor-pointer"
                                                        style={{ ...style, width: '100%' }}
                                                        onClick={() => onRowClick(row.original)}
                                                    >
                                                        {row.getVisibleCells().map((cell: any, i: number) => (
                                                            <div
                                                                key={cell.id}
                                                                className="px-4 py-2 text-sm sm:text-base overflow-hidden"
                                                                style={{ width: columnWidths[i] || 150 }}
                                                            >
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            }}
                                        </List>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4 px-2">
                            <button
                                className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded disabled:opacity-50 text-[color:#1A2B6D] dark:text-gray-200"
                                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
                                disabled={pageIndex === 0}
                            >
                                Previous
                            </button>
                            <span className="text-gray-600 dark:text-gray-300">
                                Page {pageIndex + 1} of {Math.ceil(awaitingShipments.length / pageSize)}
                            </span>
                            <button
                                className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded disabled:opacity-50 text-[color:#1A2B6D] dark:text-gray-200"
                                onClick={() => setPageIndex((prev) =>
                                    Math.min(prev + 1, Math.ceil(awaitingShipments.length / pageSize) - 1)
                                )}
                                disabled={pageIndex >= Math.ceil(awaitingShipments.length / pageSize) - 1}
                            >
                                Next
                            </button>
                        </div>

                        {/* Mobile View - Card Layout (Paginated) */}
                        <div className="md:hidden space-y-4 mt-6">
                            {paginatedData.map((shipment) => (
                                <div
                                    key={shipment.id}
                                    className="bg-gray-200 dark:bg-slate-900 rounded-xl p-4 shadow-sm cursor-pointer"
                                    onClick={() => setSelectedShipment(shipment)}
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        {/*
                                        Show only the public tracking code to the user for clarity and security.
                                        This matches the desktop view and avoids exposing internal IDs.
                                    */}
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500 text-xs">Tracking Code:</span>
                                        <span className="font-bold text-primary text-sm">{shipment.trackingCode}</span>
                                    </div>
                                        <span
                                            className={`font-semibold px-3 py-1 rounded-full text-xs
                                            ${shipment.status === "Pending"
                                                    ? "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30"
                                                    : "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                                                }
                                        `}
                                        >
                                            {shipment.status}
                                        </span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="text-gray-500 text-xs block mb-1">Recipient:</span>
                                        <span className="font-medium">{shipment.recipient}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="text-gray-500 text-xs block mb-1">Route:</span>
                                        <div className="flex items-center bg-white dark:bg-slate-600 p-2 rounded-lg">
                                            <div className="flex-1 text-center font-medium truncate px-1">{shipment.startLocation}</div>
                                            <div className="mx-1 flex-shrink-0">
                                                <ArrowRight className="text-gray-700 dark:text-gray-200" size={18} />
                                            </div>
                                            <div className="flex-1 text-center font-medium truncate px-1">{shipment.destination}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-sm mb-1">
                                        <div>
                                            <span className="text-gray-500 text-xs block">Arrival:</span>
                                            <span className="truncate block">{shipment.arrival}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs block">Items:</span>
                                            <span>{shipment.items}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs block">Weight:</span>
                                            <span>{shipment.weight}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex justify-end">
                                        <button className="flex items-center text-primary text-xs font-medium">
                                            View details <ChevronRight size={14} className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {/* Pagination controls for mobile view */}
                            <div className="flex justify-between items-center mt-4 px-2">
                                <button
                                    className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded disabled:opacity-50 text-[color:#1A2B6D] dark:text-gray-200"
                                    onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
                                    disabled={pageIndex === 0}
                                >
                                    Previous
                                </button>
                                <span className="text-gray-600 dark:text-gray-300">
                                    Page {pageIndex + 1} of {Math.max(1, Math.ceil(awaitingShipments.length / pageSize))}
                                </span>
                                <button
                                    className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded disabled:opacity-50 text-[color:#1A2B6D] dark:text-gray-200"
                                    onClick={() => setPageIndex((prev) => Math.min(prev + 1, Math.ceil(awaitingShipments.length / pageSize) - 1))}
                                    disabled={pageIndex >= Math.ceil(awaitingShipments.length / pageSize) - 1}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 text-gray-500">No shipments available</div>
                )}

                {/* Shipment Detail Modal (renders when a shipment is selected) */}
                {selectedShipment && (
                    <AwaitingShipmentDetail
                        shipment={selectedShipment}
                        onClose={() => setSelectedShipment(null)}
                    />
                )}
            </div>
        </>
    );
};

// Export the AwaitingShipmentTable component as default for clean import usage
export default AwaitingShipmentTable;

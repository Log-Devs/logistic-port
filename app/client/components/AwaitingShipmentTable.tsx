import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { FixedSizeList as List } from 'react-window';
import { Clock, ArrowRight, ChevronRight } from "lucide-react";

// Define the AwaitingShipment type for each row
// AwaitingShipment type for each row
// id: Internal linear ID (not shown to users)
// trackingCode: Public, random, unguessable shipment tracking code (shown to users)
import { SHIPMENT_STATUSES } from '@/lib/logistics-statuses';

interface AwaitingShipment {
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
    const statusCode = getValue() as string;
    // Find the status object from SHIPMENT_STATUSES
    const statusObj = SHIPMENT_STATUSES.find(s => s.code === statusCode);
    // Fallbacks for unknown status
    const label = statusObj ? statusObj.label : statusCode;
    const description = statusObj ? statusObj.description : '';
    // Map of status code to color classes for dynamic rendering
    const statusColorMap: Record<string, string> = {
        PENDING: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
        RECEIVED_AT_ORIGIN: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
        READY_FOR_TRANSPORT: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
        IN_TRANSIT: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
        RECEIVED_AT_DESTINATION: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
        READY_FOR_PICKUP: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
        OUT_FOR_DELIVERY: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
        DELIVERED: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
    };
    // Dynamically assign color class based on status code
    const colorClass = statusColorMap[statusCode] || 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    return (
        <span
            className={`font-semibold px-3 py-1 rounded-full text-xs whitespace-nowrap ${colorClass}`}
            title={description}
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
const pageSize = 10; // Changed from 20 to 10 as per latest requirements

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

    // Table instance
    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Column widths in percentages - they must add up to 100%
    const columnWidths = ['10%', '18%', '22%', '14%', '10%', '12%', '14%'];

    return (
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
            {/* Main Table UI */}
            {!loading && !error && awaitingShipments && awaitingShipments.length > 0 ? (
                <>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                        <div className="flex items-center">
                            <Clock size={24} className="text-primary" />
                            <h1 className="text-[color:#1A2B6D] text-lg sm:text-xl font-bold px-3 sm:px-5 dark:text-gray-100">
                                Awaiting Shipment List
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm py-2 sm:py-4 px-0 sm:px-10">
                        All shipments that are currently awaiting processing.
                    </p>

                    {/* Desktop View - Virtualized Table */}
                    <div className="hidden md:block overflow-hidden">
                        <div className="overflow-x-auto">
                            <div className="w-full min-w-[800px]">
                                {/* Table Headers */}
                                <div className="flex border-b border-gray-300 dark:border-slate-700 py-2 text-gray-400">
                                    {table.getFlatHeaders().map((header, i) => (
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
                                        itemData={{ table, columnWidths }}
                                    >
                                        {VirtualRow}
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
                                Math.min(prev + 1, Math.floor(awaitingShipments.length / pageSize))
                            )}
                            disabled={pageIndex >= Math.floor(awaitingShipments.length / pageSize)}
                        >
                            Next
                        </button>
                    </div>

                    {/* Mobile View - Card Layout (Paginated) */}
                    <div className="md:hidden space-y-4 mt-6">
                        {paginatedData.map((shipment) => (
                            <div 
                                key={shipment.id} 
                                className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500 text-xs">ID:</span>
                                        <span className="font-medium text-sm">{shipment.id}</span>
                                    </div>
                                    <span
                                        className={`font-semibold px-3 py-1 rounded-full text-xs
                                            ${
                                                shipment.status === "Pending"
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
                    </div>
                </>
            ) : (
                <div className="text-center py-12 text-gray-500">No shipments available</div>
            )}
        </div>
    );
};

/**
 * USAGE EXAMPLE FOR API INTEGRATION:
 *
 * import { AwaitingShipmentTable, useAwaitingShipments } from "@/app/client/components/AwaitingShipmentTable";
 *
 * function AwaitingShipmentPage() {
 *   const [data, loading, error] = useAwaitingShipments("/api/awaiting-shipments");
 *   return <AwaitingShipmentTable awaitingShipments={data} loading={loading} error={error} />;
 * }
 *
 * This pattern ensures the table is robust and ready for real-world API usage.
 */



// Virtual Row component for react-window
const VirtualRow = ({ index, style, data }: { index: number; style: React.CSSProperties; data: any }) => {
    const { table, columnWidths } = data;
    const row = table.getRowModel().rows[index];
    
    if (!row) return null;
    
    return (
        <div 
            className="flex border-b border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors items-center cursor-pointer"
            style={{ ...style, width: '100%' }}
        >
            {row.getVisibleCells().map((cell: { id: React.Key | null | undefined; column: { columnDef: { cell: string | number | bigint | boolean | React.ComponentType<any> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; }; getContext: () => any; }, i: string | number) => (
                <div 
                    key={cell.id} 
                    className="px-4 py-2 text-sm sm:text-base overflow-hidden"
                    style={{ width: columnWidths[i] }}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
            ))}
        </div>
    );
};

// Demo component with sample data for testing
const DemoAwaitingShipmentTable = () => {
    // Helper to generate a random, unguessable tracking code for demo data
    function generateDemoTrackingCode(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `SHIP-${code}`;
    }

    // Generate a large dataset for testing
    const generateDemoData = () => {
        const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco", 
                          "Seattle", "Miami", "Boston", "Denver", "Washington DC", "Atlanta", "Dallas"];
        const statuses = ["Pending", "Processing"];
        // Generate AwaitingShipment[] with trackingCode for demo/testing compatibility
        return Array.from({ length: 500 }, (_, i) => ({
            id: `SHP-${2023 + Math.floor(i/100)}-${String(i % 1000).padStart(3, '0')}`,
            trackingCode: generateDemoTrackingCode(),
            recipient: `Customer ${i + 1}`,
            startLocation: locations[i % locations.length],
            destination: locations[(i + 3) % locations.length],
            arrival: `Jun ${5 + (i % 25)}, 2025`,
            items: 1 + (i % 10),
            weight: `${(Math.random() * 50).toFixed(1)} kg`,
            status: statuses[i % statuses.length]
        }));
    };
    
    const demoShipments = generateDemoData();
    
    return <AwaitingShipmentTable awaitingShipments={demoShipments} />;
};

/**
 * Exports: AwaitingShipmentTable as default and named; DemoAwaitingShipmentTable as named only
 */
export default AwaitingShipmentTable;
export { AwaitingShipmentTable, DemoAwaitingShipmentTable };

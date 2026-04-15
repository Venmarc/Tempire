export default function SellerDashboard() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter mb-4">Seller Dashboard</h1>
                <p className="text-zinc-400">This is a protected seller-only page.</p>
                <p className="text-sm text-zinc-500 mt-8">
                    Phase 1 — Role-based access control via Clerk publicMetadata
                </p>
            </div>
        </div>
    );
}
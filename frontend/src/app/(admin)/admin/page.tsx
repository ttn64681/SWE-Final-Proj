export default function AdminProfilePage() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <ul className="list-disc pl-6 text-sm opacity-90">
        <li>Manage movies</li>
        <li>Manage users</li>
        <li>Manage prices and promotions</li>
        <li>View statistics</li>
      </ul>
    </div>
  );
}

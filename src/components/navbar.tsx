export default function Navbar() {
  return (
    <nav className="flex space-x-10 ">
      <p>logo</p>
      <div className="bg-slate-200 w-48 h-8 rounded-xl">Search</div>
      <ul>
        <li>
          {" "}
          <h2 className="text-2xl font-bold ml-4">Exercises</h2>{" "}
        </li>
      </ul>
    </nav>
  );
}

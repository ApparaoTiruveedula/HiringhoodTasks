
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search, X, Plus, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { RootState } from "@/store/store";
import { setFilter, setSearchTerm } from "@/store/contactsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { filter, searchTerm } = useSelector((state: RootState) => state.contacts);
  const [search, setSearch] = useState(searchTerm);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    dispatch(setSearchTerm(value));
  };
  
  const clearSearch = () => {
    setSearch("");
    dispatch(setSearchTerm(""));
  };
  
  const handleFilterChange = (newFilter: 'all' | 'favorites') => {
    dispatch(setFilter(newFilter));
  };

  return (
    <header className="border-b bg-card z-10">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">ContactCompass</h1>
            </Link>
          </div>
          
          <div className="flex-grow w-full md:w-auto relative">
            <Input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={handleSearch}
              className="pl-10 pr-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search size={16} />
            </div>
            {search && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={clearSearch}
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("all")}
              className="gap-1"
            >
              <Users size={16} />
              All
            </Button>
            <Button
              variant={filter === "favorites" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("favorites")}
              className="gap-1"
            >
              <Star size={16} />
              Favorites
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/add">
              <Button size="sm" className="gap-1">
                <Plus size={16} />
                Add Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

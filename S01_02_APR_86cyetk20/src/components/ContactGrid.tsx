
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ContactCard from "./ContactCard";
import { Badge } from "@/components/ui/badge";

const ContactGrid = () => {
  const { contacts, filter, searchTerm } = useSelector((state: RootState) => state.contacts);
  
  // Filter contacts based on selected filter and search term
  const filteredContacts = contacts.filter(contact => {
    // First apply favorites filter if selected
    if (filter === 'favorites' && !contact.isFavorite) {
      return false;
    }
    
    // Then apply search if there's a search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.phone.includes(searchTerm) ||
        (contact.company && contact.company.toLowerCase().includes(searchLower)) ||
        (contact.address && contact.address.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // Sort alphabetically by name
  const sortedContacts = [...filteredContacts].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Contacts</h2>
          <Badge variant="outline">{sortedContacts.length}</Badge>
        </div>
      </div>

      {sortedContacts.length > 0 ? (
        <div className="card-grid">
          {sortedContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-primary/5 p-6 rounded-full mb-4">
            <svg
              className="h-12 w-12 text-primary/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">No contacts found</h3>
          <p className="text-muted-foreground max-w-sm">
            {filter === 'favorites' && !searchTerm
              ? "You haven't marked any contacts as favorites yet."
              : searchTerm
              ? `No results found for "${searchTerm}".`
              : "Start by adding a new contact using the 'Add Contact' button."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactGrid;

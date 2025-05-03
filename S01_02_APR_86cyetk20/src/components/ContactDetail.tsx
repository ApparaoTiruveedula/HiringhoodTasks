
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectContact } from "@/store/contactsSlice";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Mail, Phone, Briefcase, MapPin, FileText, Edit } from "lucide-react";
import DeleteContactDialog from "./DeleteContactDialog";
import { useState } from "react";

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const selectedContact = useSelector((state: RootState) => 
    state.contacts.contacts.find(contact => contact.id === id)
  );
  
  useEffect(() => {
    if (id) {
      dispatch(selectContact(id));
    }
    
    return () => {
      dispatch(selectContact(null));
    };
  }, [dispatch, id]);
  
  if (!selectedContact) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Contact not found</h2>
        <p className="mb-6">The contact you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link to="/">Go back to contacts</Link>
        </Button>
      </div>
    );
  }
  
  const handleEdit = () => {
    navigate(`/edit/${selectedContact.id}`);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-fade-in">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to contacts
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-end">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleEdit}
                className="gap-1"
              >
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete Contact
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-36 w-36 border-2 border-primary/20">
                <AvatarImage src={selectedContact.image} alt={selectedContact.name} />
                <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                  {getInitials(selectedContact.name)}
                </AvatarFallback>
              </Avatar>
              
              {selectedContact.isFavorite && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  Favorite
                </Badge>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{selectedContact.name}</h2>
              {selectedContact.company && (
                <p className="text-muted-foreground mb-4">{selectedContact.company}</p>
              )}
              
              <div className="space-y-4 mt-6">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                    <span>Email:</span>
                  </div>
                  <a 
                    href={`mailto:${selectedContact.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-5 w-5" />
                    <span>Phone:</span>
                  </div>
                  <a 
                    href={`tel:${selectedContact.phone}`}
                    className="text-primary hover:underline"
                  >
                    {selectedContact.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                  </a>
                </div>
                
                {selectedContact.company && (
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-5 w-5" />
                      <span>Company:</span>
                    </div>
                    <span>{selectedContact.company}</span>
                  </div>
                )}
                
                {selectedContact.address && (
                  <div className="flex flex-col md:flex-row md:items-start gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>Address:</span>
                    </div>
                    <span>{selectedContact.address}</span>
                  </div>
                )}
              </div>
              
              {selectedContact.notes && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <FileText className="h-5 w-5" />
                    <span>Notes:</span>
                  </div>
                  <div className="bg-secondary/40 p-4 rounded-md">
                    {selectedContact.notes}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <DeleteContactDialog 
        contact={selectedContact}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </div>
  );
};

export default ContactDetail;

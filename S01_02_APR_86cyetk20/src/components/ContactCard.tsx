
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Trash, Edit } from "lucide-react";
import { Contact } from "@/types";
import { selectContact, toggleFavorite } from "@/store/contactsSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import DeleteContactDialog from "./DeleteContactDialog";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleCardClick = () => {
    dispatch(selectContact(contact.id));
    navigate(`/contact/${contact.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(contact.id));
    toast({
      description: contact.isFavorite ? 
        `Removed ${contact.name} from favorites` : 
        `Added ${contact.name} to favorites`,
      duration: 2000,
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${contact.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
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
    <>
      <Card 
        className="contact-card cursor-pointer group animate-fade-in overflow-hidden"
        onClick={handleCardClick}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={contact.image} alt={contact.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-lg truncate">{contact.name}</h3>
              {contact.isFavorite && (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
            <p className="text-sm text-muted-foreground truncate">{contact.phone}</p>
          </div>
          
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 favorite-btn",
                contact.isFavorite && "text-yellow-500"
              )}
              onClick={handleFavoriteClick}
            >
              <Star 
                className={cn(
                  "h-4 w-4", 
                  contact.isFavorite && "fill-yellow-400"
                )}
              />
              <span className="sr-only">Favorite</span>
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleEditClick}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={handleDeleteClick}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <DeleteContactDialog 
        contact={contact}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default ContactCard;


import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteContact } from "@/store/contactsSlice";
import { Contact } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface DeleteContactDialogProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteContactDialog = ({ contact, isOpen, onClose }: DeleteContactDialogProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
    toast({
      description: `${contact.name} has been deleted`,
      duration: 3000,
    });
    onClose();
    navigate("/");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="animate-fade-in">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Contact</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{contact.name}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContactDialog;


import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";

const EditContactPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">
        <ContactForm contactId={id} isEditMode />
      </main>
    </div>
  );
};

export default EditContactPage;

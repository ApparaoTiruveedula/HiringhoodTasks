
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";

const AddContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">
        <ContactForm />
      </main>
    </div>
  );
};

export default AddContactPage;

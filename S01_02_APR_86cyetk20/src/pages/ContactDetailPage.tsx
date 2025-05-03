
import Header from "@/components/Header";
import ContactDetail from "@/components/ContactDetail";

const ContactDetailPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 flex-1">
        <ContactDetail />
      </main>
    </div>
  );
};

export default ContactDetailPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { ContactFormValues, Contact } from "@/types";
import { addContact, updateContact } from "@/store/contactsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { X, Upload } from "lucide-react";

interface ContactFormProps {
  contactId?: string;
  isEditMode?: boolean;
}

const phoneRegExp = /^\d{10}$/;

const ContactForm = ({ contactId, isEditMode = false }: ContactFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const existingContact = isEditMode && contactId 
    ? contacts.find(contact => contact.id === contactId) 
    : null;
  
  const phoneNumberWithoutFormatting = (phone: string) => {
    return phone.replace(/\D/g, '');
  };
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .test(
        'unique-name',
        'A contact with this name already exists',
        function (value) {
          if (!value) return true; // Skip if empty (will be caught by required)
          
          const nameExists = contacts.some(
            contact => 
              contact.name.toLowerCase() === value.toLowerCase() && 
              (!isEditMode || contact.id !== contactId)
          );
          
          return !nameExists;
        }
      ),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .test(
        'unique-email',
        'A contact with this email already exists',
        function (value) {
          if (!value) return true; // Skip if empty
          
          const emailExists = contacts.some(
            contact => 
              contact.email.toLowerCase() === value.toLowerCase() && 
              (!isEditMode || contact.id !== contactId)
          );
          
          return !emailExists;
        }
      ),
    phone: Yup.string()
      .required('Phone number is required')
      .test(
        'is-ten-digits',
        'Phone number must be exactly 10 digits',
        value => !value || phoneRegExp.test(phoneNumberWithoutFormatting(value))
      )
      .test(
        'unique-phone',
        'A contact with this phone number already exists',
        function (value) {
          if (!value) return true; // Skip if empty
          
          const normalizedPhone = phoneNumberWithoutFormatting(value);
          
          const phoneExists = contacts.some(
            contact => 
              phoneNumberWithoutFormatting(contact.phone) === normalizedPhone && 
              (!isEditMode || contact.id !== contactId)
          );
          
          return !phoneExists;
        }
      ),
    address: Yup.string(),
    company: Yup.string(),
    notes: Yup.string(),
  });

  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: existingContact?.name || '',
      email: existingContact?.email || '',
      phone: existingContact?.phone || '',
      address: existingContact?.address || '',
      company: existingContact?.company || '',
      notes: existingContact?.notes || '',
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let imageUrl = existingContact?.image || '';
        
        // Handle image upload (in a real app, you'd upload to a server)
        if (values.image) {
          // For demo purposes, we'll use a FileReader to create a data URL
          const reader = new FileReader();
          imageUrl = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(values.image as File);
          });
        } else if (imagePreview && !values.image) {
          imageUrl = imagePreview;
        }
        
        const contactData = {
          name: values.name,
          email: values.email,
          phone: phoneNumberWithoutFormatting(values.phone),
          address: values.address,
          company: values.company,
          notes: values.notes,
          image: imageUrl,
          isFavorite: existingContact?.isFavorite || false,
        };
        
        if (isEditMode && existingContact) {
          dispatch(updateContact({
            ...contactData,
            id: existingContact.id,
          }));
          toast({
            description: `${values.name} has been updated`,
            duration: 3000,
          });
        } else {
          dispatch(addContact(contactData));
          toast({
            description: `${values.name} has been added to contacts`,
            duration: 3000,
          });
        }
        
        navigate('/');
      } catch (error) {
        console.error("Error saving contact:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save contact. Please try again.",
        });
      }
    },
  });
  
  useEffect(() => {
    if (existingContact?.image) {
      setImagePreview(existingContact.image);
    }
  }, [existingContact]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
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
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit' : 'Add'} Contact</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-auto flex flex-col items-center gap-2">
              <Avatar className="h-32 w-32 border-2 border-primary/20">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} alt="Contact" />
                ) : (
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {formik.values.name ? getInitials(formik.values.name) : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md text-sm transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {imagePreview ? "Change" : "Upload"}
                </Label>
                <Input
                  type="file"
                  id="image-upload"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                {imagePreview && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4 w-full">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  {...formik.getFieldProps('name')}
                  className={formik.touched.name && formik.errors.name ? "border-destructive" : ""}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-destructive">{formik.errors.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  {...formik.getFieldProps('email')}
                  className={formik.touched.email && formik.errors.email ? "border-destructive" : ""}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-destructive">{formik.errors.email}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="10-digit phone number"
                  {...formik.getFieldProps('phone')}
                  className={formik.touched.phone && formik.errors.phone ? "border-destructive" : ""}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-sm text-destructive">{formik.errors.phone}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Company name (optional)"
                {...formik.getFieldProps('company')}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Address (optional)"
                {...formik.getFieldProps('address')}
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional notes (optional)"
                className="min-h-[100px]"
                {...formik.getFieldProps('notes')}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update" : "Add"} Contact
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;


import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Number Crunch Ninja</h1>
        <p className="text-purple-200 text-sm">Your powerful calculator companion</p>
      </div>
      
      <Calculator />
      
      <div className="mt-10 text-center text-white/70 text-sm max-w-sm">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <p className="mb-2">Use keyboard for input or click buttons</p>
          <p>Handles basic arithmetic, square root and more</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

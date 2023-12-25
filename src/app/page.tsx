import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import { cn } from "@lib/utils";
import { Todo } from "@/types/todos";
import GreetImage from "@assets/greet.svg";
import Image from "next/image";

const todos: Todo[] = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Buy groceries for the week.",
    completed: false,
    createdAt: new Date().getTime(),
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Buy groceries for the week.",
    completed: true,
    createdAt: new Date().getTime(),
  },
  {
    id: 3,
    title: "Buy groceries",
    description: "Buy groceries for the week.",
    completed: false,
    createdAt: new Date().getTime(),
  },
];

export default function Home() {
  return (
    <main className="p-4">
      <div
        className={cn(
          "top flex flex-col lg:flex-row justify-stretch items-start gap-4" // Container
        )}
      >
        {/* Left Section */}
        <div
          className={cn(
            "flex-grow w-full gap-4" // Container
          )}
        >
          {/* Greeting */}
          <section
            className={cn(
              "w-full h-64", // Size
              "overflow-hidden", // Container
              "border rounded-md", // Border
              "shadow-md shadow-slate-900", // Shadow
              "bg-card/60 backdrop-blur-[2px] backdrop-filter supports-[backdrop-filter]:bg-transparent" // Background
            )}
          >
            {/* Greet Image */}
            <div
              className={cn(
                "w-full h-full", // Size
                "absolute top-0 left-0 -z-[1]" // Container
              )}
            >
              <Image
                src={GreetImage}
                alt="Greet Image"
                className={cn(
                  "h-[calc(200%+10px)] w-auto min-h-full", // Size
                  "absolute -top-28 right-0", // Container
                  // Fade left side
                  "filter brightness-100 contrast-125 opacity-80"
                )}
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, transparent 12%, black 75%, black 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, transparent 12%, black 75%, black 100%)",
                }}
              />
            </div>

            <div
              className="p-4 flex flex-col justify-stretch items-start gap-4 drop-shadow-lg"
              style={{
                height: "100%",
                backgroundImage:
                  "linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background)) 12%, transparent 75%, transparent 100%)",
              }}
            >
              <h2
                className={cn(
                  "text-6xl p-2 font-rubik_vinyl tracking-[0.2em]" // Text
                )}
              >
                Hi, <span className="font-bold">Arif!</span>
              </h2>
              <p className="text-lg font-medium text-muted-foreground">
                Welcome to your most personalized productivity dashboard.
              </p>
            </div>
          </section>
        </div>

        {/* Right Section */}
        <div
          className={cn(
            "w-96 flex-shrink-0" // Container
          )}
        >
          {/* Todos */}
          <section
            className={cn(
              "w-full p-4", // Container
              "border rounded-md", // Border
              "shadow-md shadow-slate-900", // Shadow
              "bg-card/60 backdrop-blur-[2px] backdrop-filter supports-[backdrop-filter]:bg-transparent" // Background
            )}
          >
            <h2 className="text-xl font-noto_serif_georgian font-semibold">
              Your Todos!
            </h2>
            <p className="text-base text-muted-foreground">
              You have <span className="font-bold">3</span> todos left today.
            </p>
            {/* Todos */}
            <div
              className={cn(
                "w-full mt-4 flex flex-col gap-2" // Container
              )}
            >
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={cn(
                    "w-full p-2 flex flex-row items-center justify-stretch gap-2", // Container
                    "rounded-md", // Border
                    "bg-muted" // Background
                  )}
                >
                  <div className="p-2">
                    <Checkbox checked={todo.completed} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ellipsis">
                      {todo.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-ellipsis">
                      {todo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-border mt-2" /> {/* Separator */}
            {/* Goto Todos */}
            <Button className="w-full mt-2" variant="outline">
              Go to Todos
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}

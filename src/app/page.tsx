"use client";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  return (
    <main className="flex flex-col items-center justify-between min-h-screen pt-8">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <form
          className="flex flex-col items-center gap-2 w-full max-w-xl"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            await saveSketchMutation({ ...formData, image });
          })}
        >
          <Label htmlFor="prompt" style={{ fontSize: "2em", color: "red" }}>
            ADD YOUR THOUGHTS HERE 🤔
          </Label>
          <Input id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && (
            <span style={{ fontSize: "1.8em", color: "red" }}>
              This field is required
            </span>
          )}

          <Label className="mt-4" style={{ fontSize: "2em", color: "red" }}>
            AND DRAW SOMETHING BELOW 🎨
          </Label>
          <div className="w-full max-w-md">
            <ReactSketchCanvas
              ref={canvasRef}
              style={{ width: "100%", height: 500 }} /* Adjust height as needed */
              strokeWidth={4}
              strokeColor="black"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => {
                canvasRef.current?.clearCanvas();
              }}
              style={{ color: "red" }}
            >
              Clear
            </Button>

            <Button type="submit" style={{ backgroundColor: "red" }}>
              Submit
            </Button>
          </div>
        </form>
      </div>

      <section className="container mx-auto mt-8 mb-8">
        <h1 className="text-center mb-4" style={{ color: "red" }}>
          HERE IS WHAT YOU IMAGINED .. 🎨✨
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {/* Your sketches or images here */}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {sortedSketches.map((sketch) => (
            <img
              key={sketch._id}
              width="300"
              height="300"
              src={sketch.result}
              alt="Recent Sketch"
            />
          ))}
        </div>
      </section>
      <div className="w-full bg-gray-200 py-4 text-center">
      <p className="text-sm text-gray-600">
        Made with ❤️ by Meryem, Asma, Rahma, and Iheb
      </p>
    </div>

    </main>
    
  );
}

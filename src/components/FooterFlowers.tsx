"use client";

import { useEffect, useRef } from "react";

export function FooterFlowers() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to match parent
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const flowers: Flower[] = [];

        class Flower {
            x: number;
            y: number;
            size: number;
            maxSize: number;
            color: string;
            petals: number;
            velocity: number;
            angle: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = 0;
                this.maxSize = Math.random() * 20 + 10; // Random size
                this.color = `hsl(${Math.random() * 360}, 100%, 70%)`; // Random neon color
                this.petals = Math.floor(Math.random() * 5) + 4; // 4 to 8 petals
                this.velocity = 0.5 + Math.random() * 0.5;
                this.angle = Math.random() * Math.PI * 2;
            }

            draw() {
                if (!ctx) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;

                for (let i = 0; i < this.petals; i++) {
                    ctx.rotate((Math.PI * 2) / this.petals);
                    ctx.beginPath();
                    ctx.ellipse(0, this.size, this.size / 3, this.size, 0, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();

                ctx.restore();
            }

            update() {
                if (this.size < this.maxSize) {
                    this.size += this.velocity;
                    this.angle += 0.01;
                }
            }
        }

        const animate = () => {
            // Clear with slight opacity for trail effect if desired, but here we just clear
            // We might want them to persist. Let's persist them.
            // Actually, if we redraw everything every frame, we can animate growing.
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            flowers.forEach((flower) => {
                flower.update();
                flower.draw();
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            flowers.push(new Flower(x, y));
        };

        canvas.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
            canvas.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-auto cursor-crosshair"
            style={{ touchAction: "none" }}
        />
    );
}

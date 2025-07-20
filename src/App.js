/*
A simple React SPA to display the letter as a story, surrounded by floating ice cream illustrations.
- Config object lets you change title, paragraphs, and image URLs.
- Paragraphs alternate tilt.
- A button reveals a modal with a picture.
*/

import React, { useEffect, useState } from "react";
import "./App.css";

// ---- CONFIG ----
const config = {
	title: "Dear Avery,",
	paragraphs: [
		"In this edition, I wanted to walk through different parts of the last two years we’ve had through a common theme… or common cream 😉… that I know we both love: Ice cream 🍦",
		"Starting with what I think was one of our first ice‑cream adventures: Granville Island. I still remember wandering through the stalls, hunting for the best cheese and meat for our charcuterie board. I remember claiming a bench by the docks. I remember the gift‑shopping race that followed… and how could I forget the ice cream we ate inside that little wooden cabana when you told me you “loved chocolate” 🍫 (code for something else 👀). The flavor itself wasn’t the most memorable thing—but the feelings I felt for you were. I’m so glad we shared that moment ❤️",
		"BTW, I considered putting Din Tai Fung’s chocolate xiao long bao on this list, but I realized they’re truffles… so never mind. Still, give me credit for the idea, lol.",
		"Molly Moon’s ice cream, however, is definitely something I can recall as being pretty good. One thing that sticks in my mind is how we always end up sharing our cups and trying each other’s flavors. I love how sharing food—and life—with you feels so natural.",
		"Another thing I love that we share is internet memes and content. Obv, we’re both Gen Z, so we’re chronically online—but I adore that we express love for the other’s obsessions, whether it’s that girl‑bop you look up to or some dude making wood ice cream. BTW, we have to try wood ice cream someday.",
		"An ice cream you’ve told me about at least a dozen times is the Häagen‑Dazs special flavor that you can’t get anywhere in the US—which, after some deep research (I THINK), is macadamia‑nut brittle. Please don’t kill me if I’m wrong 😩",
		"Over the years, I’ve loved introducing you to my (many) friends. One such time (or multiple times?) was at Mercurio’s! How could we forget their FIRE ice cream? I’ve always loved strolling Pittsburgh’s streets with you, sharing ice cream as we walk and talk ❤️",
		"Back in Seattle, Salt & Straw definitely has some memorable flavors. Now, I’m only about 50% sure we went there… and I don’t think I loved it lmao. But hey, what’s a relationship without its ups and downs? 🥰",
		"Chicago: Mako omakase sorbet. I finally remembered the name of that place in the West Loop… and what a dinner we had. I don’t remember if you paid (I think you did—thank you, love), but I do remember loving the food and ‘mirin you as you took pictures of every course.",
		"San Diego: MooTime Creamery. It’s kind of hazy, but I’m PRETTY sure we went there when you visited. I loved that trip because of the impression you made on my siblings and parents—each of them adores you. I also loved hanging on the beach with you <3… and laughing about how we ended up sleeping on a sandy bed.",
		"Thinking back to our many visits, a recent one included us grabbing a scoop or two at Hellenika Greek‑yogurt ice cream at Pike Place. The whole Pike Place Market, the marina, the ferry—they remind me of exploring new places with you :)",
		"And last, but not least, vanilla ice cream in our coconut shake… while it may have given me the shits, I wouldn’t trade it for anything <3. Thank you for showing me so many amazing things about the world—from Malaysian lattice bread to rock‑band “whippersnappers” 👴🏻… I love you.",
		"To many more ice creams...\nLove, Luca",
	],
	modalImageSrc: "/pic.png", // replace with your picture URL
};

// Create ice cream illustration components
const IceCreamCone = ({ className, style, variant = "default" }) => (
	<div className={`ice-cream-container ${className} ${variant}`} style={style}>
		<div className="ice-cream-scoop scoop-1"></div>
		<div className="ice-cream-scoop scoop-2"></div>
		<div className="ice-cream-cone"></div>
	</div>
);

const IceCreamPopsicle = ({ className, style, variant = "default" }) => (
	<div className={`popsicle-container ${className} ${variant}`} style={style}>
		<div className="popsicle-body"></div>
		<div className="popsicle-stick"></div>
	</div>
);

const IceCreamTriple = ({ className, style, variant = "default" }) => (
	<div className={`triple-container ${className} ${variant}`} style={style}>
		<div className="ice-cream-scoop scoop-1"></div>
		<div className="ice-cream-scoop scoop-2"></div>
		<div className="ice-cream-scoop scoop-3"></div>
		<div className="ice-cream-cone"></div>
	</div>
);

const IceCreamCup = ({ className, style, variant = "default" }) => (
	<div className={`cup-container ${className} ${variant}`} style={style}>
		<div className="ice-cream-scoop scoop-1"></div>
		<div className="ice-cream-cup"></div>
	</div>
);

// Ice cream data with types and variants
const iceCreamVariants = [
	{ type: "cone", variant: "strawberry" },
	{ type: "popsicle", variant: "rainbow" },
	{ type: "cone", variant: "mint" },
	{ type: "popsicle", variant: "orange" },
	{ type: "cone", variant: "chocolate" },
	{ type: "popsicle", variant: "blue" },
	{ type: "cone", variant: "vanilla" },
	{ type: "popsicle", variant: "pink" },
	{ type: "cone", variant: "caramel" },
	{ type: "popsicle", variant: "green" },
	{ type: "cone", variant: "berry" },
	{ type: "popsicle", variant: "sunset" },
	{ type: "triple", variant: "rainbow" },
	{ type: "triple", variant: "strawberry" },
	{ type: "triple", variant: "chocolate" },
	{ type: "cup", variant: "vanilla" },
	{ type: "cup", variant: "mint" },
	{ type: "cup", variant: "berry" },
];

// Generate random position anywhere on the page
const generateRandomPosition = () => {
	const viewportWidth = 100;
	const viewportHeight = 150;

	const top = Math.random() * viewportHeight;
	const left = Math.random() * viewportWidth;

	return {
		top: `${top}%`,
		left: `${left}%`,
		animationDelay: `${Math.random() * -8}s`,
	};
};

// Generate random ice cream with position
const generateRandomIceCream = () => {
	const variant =
		iceCreamVariants[Math.floor(Math.random() * iceCreamVariants.length)];
	return {
		id: Math.random(),
		...variant,
		...generateRandomPosition(),
	};
};

// Generate paragraph corner ice cream
const generateCornerIceCream = (cornerType) => {
	const variant =
		iceCreamVariants[Math.floor(Math.random() * iceCreamVariants.length)];
	return {
		id: Math.random(),
		...variant,
		cornerType, // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
		animationDelay: `${Math.random() * -8}s`,
	};
};

export default function App() {
	const [showModal, setShowModal] = useState(false);
	const [backgroundIceCreams, setBackgroundIceCreams] = useState([]);
	const [paragraphIceCreams, setParagraphIceCreams] = useState([]);

	// Generate static ice creams on mount
	useEffect(() => {
		// Background ice creams
		const bgIceCreams = Array.from({ length: 20 }, () =>
			generateRandomIceCream()
		);
		setBackgroundIceCreams(bgIceCreams);

		// Paragraph corner ice creams - randomly assign to some paragraphs
		const cornerIceCreams = [];
		config.paragraphs.forEach((_, index) => {
			// 60% chance each paragraph gets a corner ice cream
			if (Math.random() < 0.6) {
				const corners = [
					"top-left",
					"top-right",
					"bottom-left",
					"bottom-right",
				];
				const corner = corners[Math.floor(Math.random() * corners.length)];
				cornerIceCreams.push({
					...generateCornerIceCream(corner),
					paragraphIndex: index,
				});
			}
		});
		setParagraphIceCreams(cornerIceCreams);
	}, []);

	// Set app container height based on story container height
	useEffect(() => {
		const setAppHeight = () => {
			const storyContainer = document.querySelector(".story-container");
			const appContainer = document.querySelector(".app-container");

			if (storyContainer && appContainer) {
				// Get story height and top offset
				const storyHeight = storyContainer.offsetHeight;
				const storyTopOffset = 40; // Story container's CSS top position

				// Total height = top offset + content height + bottom margin
				const totalHeight = storyTopOffset + storyHeight + 40;

				console.log(
					"Story height:",
					storyHeight,
					"Story top offset:",
					storyTopOffset,
					"Setting app height to:",
					totalHeight
				);
				appContainer.style.height = `${totalHeight}px`;
			}
		};

		// Wait longer for all content to render, including ice creams
		const timer = setTimeout(setAppHeight, 500);

		// Update on window resize
		window.addEventListener("resize", setAppHeight);

		return () => {
			clearTimeout(timer);
			window.removeEventListener("resize", setAppHeight);
		};
	}, [paragraphIceCreams]); // Re-run when content changes

	return (
		<div className="app-container">
			{/* Background floating ice cream illustrations */}
			{backgroundIceCreams.map((iceCream) => {
				const Component =
					iceCream.type === "cone"
						? IceCreamCone
						: iceCream.type === "popsicle"
						? IceCreamPopsicle
						: iceCream.type === "triple"
						? IceCreamTriple
						: IceCreamCup;

				const style = {
					top: iceCream.top,
					left: iceCream.left,
					animationDelay: iceCream.animationDelay,
				};

				return (
					<Component
						key={iceCream.id}
						className="floating-treat background-treat"
						variant={iceCream.variant}
						style={style}
					/>
				);
			})}

			<div className="story-container">
				<h1 className="title">{config.title}</h1>
				{config.paragraphs.map((text, idx) => {
					// Find ice cream for this paragraph
					const paragraphIceCream = paragraphIceCreams.find(
						(ice) => ice.paragraphIndex === idx
					);

					return (
						<div key={idx} className="paragraph-container">
							<p
								className={`paragraph ${
									idx % 2 === 0 ? "tilt-left" : "tilt-right"
								}`}
							>
								{text}
							</p>

							{/* Paragraph corner ice cream */}
							{paragraphIceCream &&
								(() => {
									const Component =
										paragraphIceCream.type === "cone"
											? IceCreamCone
											: paragraphIceCream.type === "popsicle"
											? IceCreamPopsicle
											: paragraphIceCream.type === "triple"
											? IceCreamTriple
											: IceCreamCup;
									return (
										<Component
											className={`corner-treat corner-${paragraphIceCream.cornerType}`}
											variant={paragraphIceCream.variant}
											style={{
												animationDelay: paragraphIceCream.animationDelay,
											}}
										/>
									);
								})()}
						</div>
					);
				})}
				<button className="photo-btn" onClick={() => setShowModal(true)}>
					<span>✨ Reveal Picture ✨</span>
				</button>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="modal-overlay" onClick={() => setShowModal(false)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<button className="close-btn" onClick={() => setShowModal(false)}>
							×
						</button>
						<img src={config.modalImageSrc} alt="Special moment" />
					</div>
				</div>
			)}
		</div>
	);
}

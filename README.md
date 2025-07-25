# 🧭 Pathfinding Visualizer – Dijkstra’s Algorithm

A web-based interactive visualizer for **Dijkstra’s shortest path algorithm**, built with **React** and **Vite**. This project allows users to explore how Dijkstra’s algorithm finds the shortest path in a grid, with animated visualization and interactive controls.

---

## ✨ Features

- **Interactive Grid**: Click and drag to draw walls, set start and target nodes.
- **Dijkstra’s Algorithm**: Step-by-step visualization of the shortest path finding.
- **Animated Visualization**: Nodes animate as they are visited and as the shortest path is traced.
- **Customizable Controls**: Toggle wall drawing, start/target node placement, or reset the grid.
- **Responsive UI**: Works smoothly on both desktop and mobile devices.
- **Visual Effects**: Background particle effects and spark animations on click for enhanced UX.

---

## 📸 Demo

![Demo GIF or Screenshot](https://drive.google.com/file/d/17QMXVNds6T61sOpmLUtZ69gsBipWWmir/view?usp=sharing)
![Demo GIF or Screenshot](https://drive.google.com/file/d/1OHJeeFOu8WKXAnkl_E8qpo13iBsPno-E/view?usp=sharing)

> *(Replace the link above with an actual GIF or screenshot of the visualizer in action)*

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** (v16 or later recommended)
- **npm** or **yarn**

---

### 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pathfinding-visualizer.git
   cd pathfinding-visualizer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   Visit: [http://localhost:5173](http://localhost:5173)

---

### 📦 Build for Production

```bash
npm run build
# or
yarn build
```

---

## 🕹️ Usage

- **Draw Walls**: Click and drag on the grid to create or remove walls.
- **Set Start/Target Nodes**: Use UI controls to switch modes and click on the grid.
- **Visualize Algorithm**: Click the “Visualize Dijkstra’s Algorithm” button.
- **Reset Grid**: Clears all nodes and walls to start fresh.

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── PathFindingVisualiser.jsx
│   ├── Node.jsx
│   ├── Particles.jsx
│   ├── ClickSpark.jsx
│   └── SplitText.jsx
├── algorithms/
│   └── dijkstra.js
├── styles/
│   ├── PathFindingVisualiser.css
│   └── Node.css
└── main.jsx
```

---

## 🔧 Customization

- **Grid Size**: Modify the `getInitialGrid` function in `PathFindingVisualiser.jsx`.
- **Colors & Animations**: Tweak styles in `PathFindingVisualiser.css` and `Node.css`.
- **Extend Algorithm**: Add new algorithms (like A*, BFS, DFS) in the `algorithms/` directory.

---

## 📦 Dependencies

- [`React`](https://reactjs.org/)
- [`Vite`](https://vitejs.dev/)
- [`GSAP`](https://greensock.com/gsap/) – For text animations
- [`OGL`](https://oframe.github.io/ogl/) – For particle effects
- [`react-icons`](https://react-icons.github.io/react-icons/) – For UI icons

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

> Made with ⚡ by Anudeep (https://github.com/Anudeep-9507)

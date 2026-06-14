import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";

// ---- tweakables (mirror the approved concept) ----
const MODEL_URL = "/models/urus.glb";
const PERF_URL = "/models/urus_performante.glb";
const DONOR_WHEELS_NAME = "Combined_Wheels_3D_";
const OLD_WHEELS_NAME = "Wheels";
const TARGET_LEN = 3.6;
const FRONT_SIGN = 1; // which local-X end is the front
const STEER_ANGLE = -0.38; // front-wheel steer at rest (right)
const ROLL_DIR = 1;
const START_X = 5, START_Z = -13; // entry ~1 o'clock, far
const VIOLA = "#6A2CA5";
const SILVER = "#c9ccd2";
const POSTER = "https://ik.imagekit.io/8i3ae7fac/cars-14.jpg?tr=w-1600,q-70,f-webp";

export default function UrusHero() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const posterRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let raf = 0;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const isMobile = window.innerWidth < 720;

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const camDir = new THREE.Vector3(0.62, 0.15, 0.8).normalize();
    // fit the car's projected box to the panel — fills far more than a sphere fit
    const VFOV = THREE.MathUtils.degToRad(35);
    const HALF_W = 2.0;  // max projected half-width across the 360 (kept clip-free)
    const HALF_H = 0.95; // half-height
    const fitDistance = (a) => {
      const vHalf = Math.tan(VFOV / 2);
      return Math.max(HALF_W / (vHalf * a), HALF_H / vHalf);
    };
    camera.position.copy(camDir).multiplyScalar(fitDistance(1.6));

    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a1a, 0.3));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(5, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1; key.shadow.camera.far = 40;
    key.shadow.camera.left = -8; key.shadow.camera.right = 8;
    key.shadow.camera.top = 8; key.shadow.camera.bottom = -8;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9a96e, 1.2);
    rim.position.set(-7, 4, -5);
    scene.add(rim);

    const FLOOR_Y = -0.66;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.4 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = FLOOR_Y;
    floor.receiveShadow = true;
    scene.add(floor);

    const DRIVE_HEADING = Math.atan2(-(0 - START_Z), (0 - START_X));
    const car = new THREE.Group();
    scene.add(car);
    car.position.set(START_X, 0, START_Z);
    car.rotation.y = DRIVE_HEADING;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false; // no scroll/pinch zoom — drag to spin only
    controls.minDistance = 6;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI / 2 - 0.03;
    controls.target.set(0, 0.45, 0);
    controls.enabled = false;
    controls.autoRotateSpeed = -1.3;
    controls.addEventListener("start", () => { controls.autoRotate = false; });

    const rollPivots = [];
    const wheelUnits = [];
    let frontSteerPivots = [];
    let wheelRadius = 0;
    let rolling = false;
    const prevPos = new THREE.Vector3();
    const fwdAxis = new THREE.Vector3();
    const clock = new THREE.Clock();

    function resize() {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.copy(camDir).multiplyScalar(fitDistance(camera.aspect));
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    function animate() {
      raf = requestAnimationFrame(animate);
      clock.getDelta();
      if (rolling && wheelRadius > 0) {
        fwdAxis.set(1, 0, 0).applyQuaternion(car.quaternion);
        const signedFwd = car.position.clone().sub(prevPos).dot(fwdAxis);
        const ang = -(signedFwd / wheelRadius) * ROLL_DIR;
        rollPivots.forEach((p) => (p.rotation.z += ang));
        prevPos.copy(car.position);
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function recolorPaint(model) {
      const col = new THREE.Color(VIOLA), seen = new Set(), mats = [];
      model.traverse((o) => {
        if (!o.isMesh || !o.material) return;
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
          if (!seen.has(m.uuid)) { seen.add(m.uuid); mats.push(m); }
        });
      });
      mats.filter((m) => /paint/i.test(m.name || "")).forEach((m) => {
        if (m.color) m.color.copy(col);
        if ("metalness" in m) m.metalness = 0.6;
        if ("roughness" in m) m.roughness = 0.35;
      });
    }

    function recolorZone(model, re, hex) {
      const col = new THREE.Color(hex), seen = new Set();
      model.traverse((o) => {
        if (!o.isMesh || !o.material) return;
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
          if (seen.has(m.uuid) || !re.test(m.name || "")) return;
          seen.add(m.uuid);
          if (m.color) m.color.copy(col);
          if (m.map) m.map = null;
          if ("metalness" in m) m.metalness = 0.9;
          if ("roughness" in m) m.roughness = 0.28;
        });
      });
    }

    function buildWheelRig(model, wheelTag) {
      const wheelRe = new RegExp(wheelTag, "i");
      const wheelMeshes = [], caliperMeshes = [];
      model.traverse((o) => {
        if (!o.isMesh) return;
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        const isWheel = wheelRe.test(o.name) || mats.some((m) => m && wheelRe.test(m.name || ""));
        let p = o, isC = false;
        while (p) { if (/calip/i.test(p.name)) isC = true; p = p.parent; }
        if (isWheel) wheelMeshes.push(o);
        else if (isC) caliperMeshes.push(o);
      });
      if (!wheelMeshes.length) return;

      caliperMeshes.forEach((m) => {
        const arr = Array.isArray(m.material) ? m.material : [m.material];
        const white = arr.map((src) => {
          const c = src.clone();
          if (c.color) c.color.set("#f2f2f2");
          if ("metalness" in c) c.metalness = 0.1;
          if ("roughness" in c) c.roughness = 0.45;
          return c;
        });
        m.material = Array.isArray(m.material) ? white : white[0];
      });

      const tmp = new THREE.Vector3();
      const localCenter = (o) => { new THREE.Box3().setFromObject(o).getCenter(tmp); return car.worldToLocal(tmp.clone()); };
      const wheels = wheelMeshes.map((m) => ({ m, lc: localCenter(m) }));
      const calipers = caliperMeshes.map((m) => ({ m, lc: localCenter(m) }));
      const xs = wheels.map((w) => w.lc.x), zs = wheels.map((w) => w.lc.z);
      const midX = (Math.min(...xs) + Math.max(...xs)) / 2;
      const midZ = (Math.min(...zs) + Math.max(...zs)) / 2;
      const key2 = (lc) => (lc.x > midX ? "A" : "B") + (lc.z > midZ ? "L" : "R");
      const buckets = {};
      wheels.forEach((w) => { (buckets[key2(w.lc)] ||= { wheels: [], calipers: [] }).wheels.push(w); });
      calipers.forEach((c) => { const k = key2(c.lc); if (buckets[k]) buckets[k].calipers.push(c); });

      Object.values(buckets).forEach((b) => {
        if (!b.wheels.length) return;
        const ctr = new THREE.Vector3();
        b.wheels.forEach((w) => ctr.add(w.lc)); ctr.multiplyScalar(1 / b.wheels.length);
        if (!wheelRadius) {
          const wb = new THREE.Box3();
          b.wheels.forEach((w) => wb.expandByObject(w.m));
          wheelRadius = (wb.max.y - wb.min.y) / 2 || 0.45;
        }
        const steer = new THREE.Group(); steer.position.copy(ctr); car.add(steer);
        const roll = new THREE.Group(); steer.add(roll);
        b.wheels.forEach((w) => roll.attach(w.m));
        b.calipers.forEach((c) => steer.attach(c.m));
        rollPivots.push(roll);
        wheelUnits.push({ roll, sideSign: ctr.z > midZ ? 1 : -1 });
        const isFront = FRONT_SIGN > 0 ? ctr.x > midX : ctr.x < midX;
        if (isFront) frontSteerPivots.push(steer);
      });
    }

    function swapWheels(model, donorRoot) {
      donorRoot.updateMatrixWorld(true);
      const donorWheels = donorRoot.getObjectByName(DONOR_WHEELS_NAME);
      if (!donorWheels) return null;
      const old = model.getObjectByName(OLD_WHEELS_NAME);
      if (old && old.parent) old.parent.remove(old);
      donorWheels.updateWorldMatrix(true, false);
      const rel = new THREE.Matrix4().copy(donorRoot.matrixWorld).invert().multiply(donorWheels.matrixWorld);
      model.add(donorWheels);
      rel.decompose(donorWheels.position, donorWheels.quaternion, donorWheels.scale);
      donorWheels.traverse((o) => { if (o.isMesh) o.castShadow = true; });
      return donorWheels;
    }

    function revealCanvas() {
      canvas.style.opacity = "1";
      if (posterRef.current) posterRef.current.style.opacity = "0";
    }

    function playEntrance() {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      car.position.set(START_X, 0, START_Z);
      car.rotation.y = DRIVE_HEADING;
      if (reduce) {
        car.position.set(0, 0, 0);
        frontSteerPivots.forEach((p) => (p.rotation.y = STEER_ANGLE));
        controls.enabled = true; controls.autoRotate = true;
        return;
      }
      prevPos.copy(car.position);
      rolling = true;
      gsap.timeline()
        .to(car.position, { x: 0, z: 0, duration: 1.8, ease: "power3.out" })
        .call(() => { rolling = false; })
        .to(frontSteerPivots.map((p) => p.rotation), { y: STEER_ANGLE, duration: 0.5, ease: "power2.out" }, "-=0.1")
        .to(car.position, { y: "-=0.12", duration: 0.16, ease: "power2.out" }, "<")
        .to(car.position, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" })
        .to({}, { duration: 0.9 })
        .call(() => { controls.enabled = true; controls.autoRotate = true; });
    }

    new GLTFLoader().load(MODEL_URL, (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      model.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
      // paint (Viola), white calipers, silver diffuser, and Performante wheels are all baked in now

      let box = new THREE.Box3().setFromObject(model);
      let size = box.getSize(new THREE.Vector3());
      if (size.z > size.x) model.rotation.y += Math.PI / 2;

      box = new THREE.Box3().setFromObject(model);
      size = box.getSize(new THREE.Vector3());
      model.scale.setScalar(TARGET_LEN / Math.max(size.x, size.z));

      box = new THREE.Box3().setFromObject(model);
      const c = box.getCenter(new THREE.Vector3());
      model.position.x -= c.x; model.position.z -= c.z;
      model.position.y += (FLOOR_Y - box.min.y);

      car.add(model);
      car.updateMatrixWorld(true);

      // rig the (baked) wheels for the drive-in spin + steer (identified by material tag)
      buildWheelRig(model, "3DWheel");
      revealCanvas();
      playEntrance();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      controls.dispose();
      renderer.dispose();
      pmrem.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <img
        ref={posterRef}
        src={POSTER}
        alt="Lamborghini Urus exotic car rental in Miami"
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-700"
        fetchPriority="high"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000" />
    </div>
  );
}

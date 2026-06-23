"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, MOCK_STATS, TRANSACTIONS } from "@/data/mockData";

// Chart data
const revenueData = [
  { month: "Jan", protocol: 12000, municipal: 84000, owners: 144000 },
  { month: "Feb", protocol: 13200, municipal: 92400, owners: 158400 },
  { month: "Mar", protocol: 14500, municipal: 101500, owners: 174000 },
  { month: "Apr", protocol: 14000, municipal: 98000, owners: 168000 },
  { month: "May", protocol: 15800, municipal: 110600, owners: 189600 },
  { month: "Jun", protocol: 17500, municipal: 122500, owners: 210000 },
];

const marketplaceData = [
  { day: "Mon", listings: 120, transactions: 45 },
  { day: "Tue", listings: 132, transactions: 52 },
  { day: "Wed", listings: 141, transactions: 58 },
  { day: "Thu", listings: 138, transactions: 55 },
  { day: "Fri", listings: 155, transactions: 68 },
  { day: "Sat", listings: 162, transactions: 72 },
  { day: "Sun", listings: 148, transactions: 61 },
];

export default function AdminOverview() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Three.js scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7f8); // Light background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mapContainerRef.current.clientWidth / mapContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(18, 14, 18);
    camera.lookAt(0, 2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mapContainerRef.current.clientWidth,
      mapContainerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mapContainerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(15, 25, 15);
    scene.add(directionalLight);

    // Grid floor
    const gridHelper = new THREE.GridHelper(40, 40, 0xcccccc, 0xdddddd);
    scene.add(gridHelper);

    // 1. Cylinder (Restricted Zone - red)
    const restrictedCylinderGeo = new THREE.CylinderGeometry(4, 4, 8, 32);
    const restrictedCylinderMat = new THREE.MeshPhongMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.3,
    });
    const restrictedCylinder = new THREE.Mesh(restrictedCylinderGeo, restrictedCylinderMat);
    restrictedCylinder.position.set(-10, 4, -10);
    scene.add(restrictedCylinder);

    // 2. Airspace Parcels (boxes)
    const parcelConfigs = [
      { width: 6, height: 5, depth: 6, x: -6, z: -2, color: 0x1bd488, opacity: 0.6 },
      { width: 5, height: 4, depth: 5, x: -2, z: 2, color: 0x055b65, opacity: 0.5 },
      { width: 8, height: 7, depth: 8, x: 4, z: -2, color: 0x1bd488, opacity: 0.7 },
      { width: 4, height: 4.5, depth: 4, x: 10, z: 2, color: 0xef4444, opacity: 0.5 }, // Unauthorized area
    ];

    parcelConfigs.forEach((pc) => {
      const geometry = new THREE.BoxGeometry(pc.width, pc.height, pc.depth);
      const material = new THREE.MeshPhongMaterial({
        color: pc.color,
        transparent: true,
        opacity: pc.opacity,
        shininess: 20,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pc.x, pc.height / 2, pc.z);
      scene.add(mesh);
    });

    // 3. Drone Corridor (double tube)
    const corridorCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-15, 2, -15),
      new THREE.Vector3(-5, 3, -5),
      new THREE.Vector3(5, 2, 5),
      new THREE.Vector3(15, 3, 15),
    ]);

    // Left corridor
    const corridorGeo1 = new THREE.TubeGeometry(corridorCurve, 64, 0.6, 16, false);
    const corridorMat = new THREE.MeshPhongMaterial({
      color: 0x45828b,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const corridor1 = new THREE.Mesh(corridorGeo1, corridorMat);
    corridor1.position.x = -0.4;
    scene.add(corridor1);

    // Right corridor
    const corridorGeo2 = new THREE.TubeGeometry(corridorCurve, 64, 0.6, 16, false);
    const corridor2 = new THREE.Mesh(corridorGeo2, corridorMat);
    corridor2.position.x = 0.4;
    scene.add(corridor2);

    // Corridor center line with arrows
    const arrowCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-15, 2.2, -15),
      new THREE.Vector3(-5, 3.2, -5),
      new THREE.Vector3(5, 2.2, 5),
      new THREE.Vector3(15, 3.2, 15),
    ]);
    const arrowTubeGeo = new THREE.TubeGeometry(arrowCurve, 64, 0.15, 8, false);
    const arrowMat = new THREE.MeshBasicMaterial({ color: 0x1bd488 });
    const arrowTube = new THREE.Mesh(arrowTubeGeo, arrowMat);
    scene.add(arrowTube);

    // 4. Drones
    // Active drone 1
    const activeDrone1 = new THREE.Group();
    const droneBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.35, 0.8),
      new THREE.MeshPhongMaterial({ color: 0x1bd488 })
    );
    activeDrone1.add(droneBody);
    const droneGlow1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x1bd488, transparent: true, opacity: 0.2 })
    );
    activeDrone1.add(droneGlow1);
    scene.add(activeDrone1);

    // Active drone 2
    const activeDrone2 = new THREE.Group();
    activeDrone2.add(new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.35, 0.8),
      new THREE.MeshPhongMaterial({ color: 0x1bd488 })
    ));
    activeDrone2.add(new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x1bd488, transparent: true, opacity: 0.2 })
    ));
    scene.add(activeDrone2);

    // Unauthorized drone
    const unauthDrone = new THREE.Group();
    unauthDrone.add(new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.35, 0.8),
      new THREE.MeshPhongMaterial({ color: 0xef4444 })
    ));
    unauthDrone.add(new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.2 })
    ));
    scene.add(unauthDrone);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Move active drone 1 along corridor
      const t1 = (time * 0.3) % 1;
      const pos1 = corridorCurve.getPointAt(t1);
      activeDrone1.position.set(pos1.x - 0.4, 3, pos1.z);

      // Move active drone 2 along corridor (opposite direction)
      const t2 = ((time * 0.3) + 0.5) % 1;
      const pos2 = corridorCurve.getPointAt(t2);
      activeDrone2.position.set(pos2.x + 0.4, 3, pos2.z);

      // Move unauthorized drone
      unauthDrone.position.set(10 + Math.sin(time * 0.5) * 2, 3.5, 3 + Math.cos(time * 0.5) * 2);
      unauthDrone.rotation.y = time * 1.5;

      // Rotate camera slowly
      camera.position.x = 18 * Math.cos(time * 0.05);
      camera.position.z = 18 * Math.sin(time * 0.05);
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mapContainerRef.current) return;
      camera.aspect =
        mapContainerRef.current.clientWidth / mapContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mapContainerRef.current.clientWidth,
        mapContainerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mapContainerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Properties</div>
          <div className="kpi-value">{MOCK_STATS.totalProperties.toLocaleString()}</div>
          <div className="kpi-trend up">+2.4% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Claimed Parcels</div>
          <div className="kpi-value">{MOCK_STATS.claimedParcels.toLocaleString()}</div>
          <div className="kpi-trend up">+5.1% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Listings</div>
          <div className="kpi-value">{MOCK_STATS.activeListings.toLocaleString()}</div>
          <div className="kpi-trend up">+12 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Unauthorized Flights</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>
            {MOCK_STATS.unauthorizedFlights}
          </div>
          <div className="kpi-trend down">-8 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Protocol Revenue</div>
          <div className="kpi-value">${MOCK_STATS.protocolFees.toLocaleString()}</div>
          <div className="kpi-trend up">+18.2% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total GMV</div>
          <div className="kpi-value">${MOCK_STATS.totalRevenue.toLocaleString()}</div>
          <div className="kpi-trend up">+22.4% YoY</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Revenue Growth
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorProtocol" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1bd488" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1bd488" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMunicipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#45828b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#45828b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOwners" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#055b65" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#055b65" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--muted)" 
              tick={{ fill: "var(--muted)", fontSize: 12 }} 
            />
            <YAxis 
              stroke="var(--muted)" 
              tick={{ fill: "var(--muted)", fontSize: 12 }} 
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                background: "var(--card)", 
                border: "1px solid var(--border)", 
                borderRadius: "8px" 
              }} 
              labelStyle={{ color: "var(--text)" }}
              itemStyle={{ color: "var(--text)" }}
            />
            <Area
              type="monotone"
              dataKey="protocol"
              stroke="#1bd488"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorProtocol)"
              name="Protocol Fees"
            />
            <Area
              type="monotone"
              dataKey="municipal"
              stroke="#45828b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMunicipal)"
              name="Municipal Share"
            />
            <Area
              type="monotone"
              dataKey="owners"
              stroke="#055b65"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOwners)"
              name="Property Owners"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Marketplace Activity
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={marketplaceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--muted)" 
                tick={{ fill: "var(--muted)", fontSize: 12 }} 
              />
              <YAxis 
                stroke="var(--muted)" 
                tick={{ fill: "var(--muted)", fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  background: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "8px" 
                }} 
                labelStyle={{ color: "var(--text)" }}
                itemStyle={{ color: "var(--text)" }}
              />
              <Bar 
                dataKey="listings" 
                fill="#1bd488" 
                radius={[8, 8, 0, 0]} 
                name="Active Listings"
              />
              <Bar 
                dataKey="transactions" 
                fill="#45828b" 
                radius={[8, 8, 0, 0]} 
                name="Transactions"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Revenue Split
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Property Owners</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>60%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "60%", background: "var(--accent)" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Municipalities</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>35%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "35%", background: "#45828b" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Protocol Fees</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>5%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "5%", background: "#055b65" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          3D Airspace Command Center
        </h2>
        <div
          ref={mapContainerRef}
          style={{
            width: "100%",
            height: "550px",
            background: "var(--bg-alt)",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Overlay Legend (matches image) */}
          <div style={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            background: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: '8px', 
            padding: '14px 18px',
            zIndex: 10 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: 14, height: 14, background: '#1bd488', borderRadius: '50%' }} />
              <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>Active Drone</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: 14, height: 14, background: '#ef4444', borderRadius: '50%' }} />
              <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>Unauthorized Flight</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: 14, height: 14, background: '#1bd488', opacity: 0.5, borderRadius: 3 }} />
              <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>Claimed Parcel</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: 14, height: 14, background: '#45828b', opacity: 0.5, borderRadius: 3 }} />
              <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>City-Governed Corridor</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 14, height: 14, background: '#ef4444', opacity: 0.3, borderRadius: '50%' }} />
              <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>Restricted Zone</span>
            </div>
          </div>

          {/* Intrusion Alert Box (matches image) */}
          <div style={{ 
            position: 'absolute', 
            bottom: 16, 
            right: 16, 
            background: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: '8px', 
            padding: '12px 16px',
            maxWidth: 300,
            zIndex: 10 
          }}>
            <div style={{ color: 'var(--red-500)', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
              ⚠️ INTRUSION ALERT - SEC 08
            </div>
            <div style={{ color: 'var(--text)', fontSize: 12, marginBottom: 4 }}>
              Unauthorized Drone: Sector 1
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 11, marginBottom: 4 }}>
              Parcel #65: Private Airspace
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 11 }}>
              Action Required: Dispatch Drone-01
            </div>
          </div>

          {/* Drone Path History (matches image) */}
          <div style={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            background: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: '8px', 
            padding: '12px 16px',
            maxWidth: 280,
            zIndex: 10 
          }}>
            <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
              Drone Path History
            </div>
            {[
              'AT-1801: Claimed Parcel Delivery Drone-04',
              'AT-1800: Sector 1 Delivery Drone-01',
              'AT-1799: Sector 2 Survey Drone-03',
              'AT-1798: Sector 1 Delivery Drone-01',
              'AT-1797: Claimed Parcel Delivery Drone-05',
              'AT-1796: Sector 2 Delivery Drone-01',
              'AT-1795: Unauthorized Drone (Sector 1)',
            ].map((item, i) => (
              <div 
                key={i} 
                style={{ 
                  color: 'var(--muted)', 
                  fontSize: 11, 
                  marginBottom: 4,
                  opacity: 1 - (i * 0.1) // Fade out older items
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Recent Transactions
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Property</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: "600" }}>{tx.type}</td>
                  <td>{tx.property}</td>
                  <td style={{ fontWeight: "700" }}>${tx.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${tx.status === "Completed" ? "badge-green" : "badge-amber"}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

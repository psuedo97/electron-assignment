import { useEffect, useState } from 'react';

const LandingPage = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [cpuCores, setCpuCores] = useState<number>(0);
  const [ramUsage, setRamUsage] = useState<number>(0);
  const [totalRam, setTotalRam] = useState<number>(0);

  useEffect(() => {
    checkUsage();
    const interval = setInterval(checkUsage, 2000);
    return () => clearInterval(interval);
  }, []);

  const checkUsage = async () => {
    window.electron.ipcRenderer.sendMessage('system-info');
    window.electron.ipcRenderer.on('system-info', (args) => {
      const { cpuCore, freeRam, totalRam, cpuUsage } = args as {
        cpuCore: number;
        freeRam: number;
        totalRam: number;
        cpuUsage: { user: number; system: number };
      };
      const { user, system } = cpuUsage;
      const ramUse = parseFloat(
        ((totalRam - freeRam) / (1024 * 1024 * 1024)).toFixed(3),
      );
      const totalCpuTimeMs = (user + system) / 1000;
      const normalizedCpuUsage = (totalCpuTimeMs / (2000 * cpuCore)) * 100;
      setCpuCores(cpuCore);
      setCpuUsage(parseFloat(Math.min(normalizedCpuUsage, 100).toFixed(2)));
      setRamUsage(ramUse);
      setTotalRam(parseFloat((totalRam / (1024 * 1024 * 1024)).toFixed(3)));
    });
  };

  const getPieSlice = (percentage: number) => {
    const angle = (percentage / 100) * 360;
    const largeArc = angle > 180 ? 1 : 0;
    const radians = (angle - 90) * (Math.PI / 180);
    const x = 100 + 100 * Math.cos(radians);
    const y = 100 + 100 * Math.sin(radians);
    return `M100,100 L100,0 A100,100 0 ${largeArc},1 ${x},${y} Z`;
  };

  return (
    <div className="container">
      <h1 className="heading">System Monitoring</h1>

      {/* CPU Usage */}
      <div className="card">
        <h3>CPU Cores: {cpuCores}</h3>
        <h3>CPU Usage: {cpuUsage.toFixed(2)}%</h3>
        <svg width="250" height="250" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="#eee" />
          <path d={getPieSlice(cpuUsage)} fill="#0088FE" />
        </svg>
      </div>

      {/* RAM Usage */}
      <div className="card">
        <h3>
          RAM Usage: {ramUsage} GB / {totalRam} GB
        </h3>
        <svg width="250" height="250" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="#eee" />
          <path d={getPieSlice((ramUsage / totalRam) * 100)} fill="#00C49F" />
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;

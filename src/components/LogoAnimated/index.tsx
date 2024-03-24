import { CSSProperties, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import "./logo-animated.css";

type Props = {
  style?: CSSProperties;
};


export default function LogoAnimated({ style }: Props) {
  const { theme } = useTheme();

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    increamentOpacity();
  }, [opacity]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const increamentOpacity = async () => {
    await delay(50)

    if (opacity < 1) {
      setOpacity(opacity + 0.05);
    }
  }

  const handleButton = (e: any) => {
    e.preventDefault();
  }

  return (
    <button onClick={handleButton} style={{ border: "none", background: "none", width: "100%" }}>
      <svg
        style={{
          ...style,
          opacity,
          alignItems: "center"
        }}
        viewBox="1000 1075 2100 2175"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setOpacity(0)}
      >
        <path
          d="M 1532.500 1371.696 C 1455.439 1375.784, 1378.529 1395.142, 1322 1424.678 C 1286.156 1443.407, 1260.017 1462.256, 1232.125 1489.488 C 1192.151 1528.516, 1163.075 1572.727, 1141.688 1627 C 1119.237 1683.970, 1108.124 1740.463, 1104.847 1814.270 C 1100.206 1918.788, 1126.839 2017.309, 1182.494 2101.500 C 1249.365 2202.660, 1348.366 2272.879, 1464.500 2301.521 C 1498.894 2310.004, 1528.544 2313.767, 1568.246 2314.688 L 1594.993 2315.308 1595.250 2452.404 L 1595.507 2589.500 1595.754 2452.395 L 1596 2315.289 1638.750 2314.650 C 1662.263 2314.298, 1750.911 2313.717, 1835.746 2313.358 L 1989.993 2312.706 1990.250 2447.603 C 1990.392 2521.796, 1990.618 2433.213, 1990.754 2250.750 L 1991 1919 1780.131 1919 C 1550.150 1919, 1560.111 1919.239, 1545.471 1913.378 C 1526.498 1905.782, 1509.224 1888.519, 1501.639 1869.571 C 1497.788 1859.952, 1495.645 1846.300, 1496.368 1836 C 1498.606 1804.128, 1518.581 1779.370, 1550.500 1768.905 C 1557.481 1766.616, 1557.714 1766.608, 1636.500 1765.926 C 1679.950 1765.550, 1786.640 1765.188, 1873.588 1765.121 C 1960.536 1765.055, 2043.169 1764.704, 2057.216 1764.343 L 2082.757 1763.686 2083.360 1645.093 C 2083.692 1579.867, 2084.193 1491.513, 2084.474 1448.750 L 2084.984 1371 1811.742 1371.189 C 1661.459 1371.293, 1535.800 1371.521, 1532.500 1371.696 M 2514.319 1762.749 C 2527.419 1762.907, 2548.569 1762.907, 2561.319 1762.749 C 2574.068 1762.591, 2563.350 1762.461, 2537.500 1762.462 C 2511.650 1762.462, 2501.218 1762.591, 2514.319 1762.749 M 2181.750 1763.750 C 2206.088 1763.899, 2245.912 1763.899, 2270.250 1763.750 C 2294.588 1763.601, 2274.675 1763.479, 2226 1763.479 C 2177.325 1763.479, 2157.412 1763.601, 2181.750 1763.750 M 2176.247 2114.094 L 2176.500 2309.500 2394 2309.523 C 2513.625 2309.535, 2602.162 2309.413, 2590.750 2309.252 L 2570 2308.959 2569.996 2301.230 C 2569.994 2296.978, 2569.526 2287.200, 2568.957 2279.500 C 2558.845 2142.691, 2479.591 2022.905, 2358.630 1961.610 C 2308.007 1935.958, 2251.131 1921.412, 2193.247 1919.314 L 2175.995 1918.689 2176.247 2114.094 M 2373.190 2585.750 L 2570.880 2586.005 2571.272 2589.752 L 2571.664 2593.500 2571.832 2589.250 L 2572 2585 2373.750 2585.248 L 2175.500 2585.495 2373.190 2585.750"
          stroke="none" fill="#e56026" fill-rule="evenodd" />
        <path
          d="M 2084.639 1422.218 C 2084.308 1450.423, 2083.776 1538.843, 2083.455 1618.706 L 2082.872 1763.913 2176.686 1763.458 C 2417.431 1762.291, 2581.900 1762.137, 2588.503 1763.072 C 2624.486 1768.168, 2651.943 1796.661, 2656.238 1833.364 C 2657.124 1840.933, 2657.023 1844.239, 2655.660 1852.304 C 2652.459 1871.253, 2644.995 1885.153, 2630.902 1898.411 C 2621.563 1907.195, 2609.406 1913.785, 2596.590 1917.010 C 2588.838 1918.960, 2584.803 1919.003, 2394.590 1919.137 C 2280.237 1919.218, 2204.608 1919.623, 2210.500 1920.122 C 2317.682 1929.202, 2413.275 1978.205, 2480.237 2058.395 C 2519.514 2105.432, 2547.662 2163.084, 2560.846 2223.500 C 2566.180 2247.938, 2569.985 2280.322, 2569.996 2301.359 L 2570 2309.219 2599.250 2308.716 C 2629.445 2308.196, 2637.891 2307.387, 2664.776 2302.441 C 2739.786 2288.639, 2812.311 2255.221, 2873 2206.494 C 2943.248 2150.092, 2996.668 2072.509, 3024.823 1986 C 3064.203 1865, 3052.107 1730.074, 2991.877 1618.516 C 2969.598 1577.251, 2943.895 1542.857, 2910.019 1508.981 C 2832.097 1431.059, 2736.718 1385.821, 2624 1373.324 C 2609.824 1371.752, 2586.143 1371.577, 2346.869 1371.270 L 2085.239 1370.936 2084.639 1422.218 M 1720.500 2314.055 C 1666.050 2314.417, 1615.763 2314.778, 1608.750 2314.857 L 1596 2315 1596.005 2454.750 C 1596.011 2612.062, 1596.024 2612.451, 1603.058 2654.500 C 1606.023 2672.226, 1614.161 2704.293, 1620.554 2723.438 C 1645.010 2796.688, 1687.091 2863.812, 1742.306 2917.648 C 1810.704 2984.337, 1893.787 3028.433, 1985.991 3046.983 C 2096.885 3069.293, 2210.337 3053.365, 2309.500 3001.565 C 2377.745 2965.916, 2436.919 2914.261, 2481.981 2851 C 2534.084 2777.855, 2565.913 2687.282, 2570.626 2598.750 L 2571.305 2586 2373.781 2586 L 2176.258 2586 2175.581 2591.099 C 2174.541 2598.942, 2170.241 2611.719, 2165.913 2619.824 C 2143.495 2661.813, 2093.441 2680.351, 2049.439 2662.961 C 2021.146 2651.780, 2001.001 2628.611, 1992.777 2597.794 L 1990.564 2589.500 1990.252 2451.250 L 1989.940 2313 1904.720 2313.199 C 1857.849 2313.308, 1774.950 2313.693, 1720.500 2314.055"
          stroke="none" fill={theme === 'dark' ? "#fff" : "#000" } fill-rule="evenodd" />
      </svg>
    </button>
  );
}

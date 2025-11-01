import React, { useEffect, useRef, useState } from 'react';
import * as LightweightCharts from 'lightweight-charts';
// Added X for modals, ChevronDown for mobile dropdown
import { Search, PenTool, Plus, TrendingUp, Minus, Maximize2, ChevronDown, X } from 'lucide-react';

// Sample data generator (unchanged)
const generateSampleData = () => {
  const data = [];
  let basePrice = 82000;
  const startDate = new Date('2024-07-01');
  
  for (let i = 0; i < 120; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const open = basePrice + (Math.random() - 0.5) * 1000;
    const close = open + (Math.random() - 0.5) * 1500;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: open,
      high: high,
      low: low,
      close: close,
    });
    
    basePrice = close;
  }
  
  return data;
};

// Helper to format price
const formatPrice = (price = 0) => price.toFixed(2);

// Helper to format date
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// A simple modal component for new features
const FeatureModal = ({ title, onClose, children }) => (
  <div className="absolute inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20} /></button>
      </div>
      {children}
    </div>
  </div>
);


function StockChart({ 
  stock: initialStock = 'SENSEX', // Renamed prop
  useMockData = true,
}) {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();
  const mainContainerRef = useRef(); // For fullscreen

  // --- COMPONENT STATE ---
  const [stock, setStock] = useState(initialStock);
  const [selectedTool, setSelectedTool] = useState('crosshair');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ohlc, setOhlc] = useState(null);
  const [lastPrice, setLastPrice] = useState(null);
  
  // --- STATE FOR NEW FEATURES ---
  const [timeframe, setTimeframe] = useState('1D');
  const [isDrawingToolbarOpen, setIsDrawingToolbarOpen] = useState(true); // Show by default on desktop
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isIndicatorOpen, setIsIndicatorOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [isMobileTimeframeOpen, setIsMobileTimeframeOpen] = useState(false);
  const timeframeOptions = ['1D', '1W', '1M', '3M', '1Y', 'All'];


  // --- DATA FETCHING EFFECT ---
  // Now depends on 'stock' and 'timeframe' state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setOhlc(null); // Clear old data
      setLastPrice(null);
      setData([]);

      try {
        if (useMockData) {
          console.log(`Using mock data for ${stock} (${timeframe})`);
          await new Promise(res => setTimeout(res, 500)); // Simulate loading
          const mockData = generateSampleData();
          setData(mockData);
        } else {
          console.log(`Fetching data for ${stock} (${timeframe})...`);
          // --- This is your API call ---
          const response = await fetch(`/api/charts/${stock}?timeframe=${timeframe}`); 
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const apiData = await response.json(); 
          setData(apiData);
          // --------------------------
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
        setData([]); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [stock, useMockData, timeframe]); // Re-fetch on these changes

  // --- CHART CREATION EFFECT (runs once) ---
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = LightweightCharts.createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
            background: { color: '#ffffff' },
            textColor: '#333',
        },
        grid: {
            vertLines: { color: '#f0f0f0', style: 1 },
            horzLines: { color: '#f0f0f0', style: 1 },
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
            vertLine: { width: 1, color: '#758696', style: 3 },
            horzLine: { width: 1, color: '#758696', style: 3 },
        },
        rightPriceScale: {
            borderColor: '#D1D4DC',
            scaleMargins: { top: 0.1, bottom: 0.1 },
        },
        timeScale: {
            borderColor: '#D1D4DC',
            timeVisible: true,
            secondsVisible: false,
            rightOffset: 5,
        },
        handleScroll: { vertTouchDrag: true },
        handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    });

    const candlestickSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderDownColor: '#ef5350',
        borderUpColor: '#26a69a',
        wickDownColor: '#838383',
        wickUpColor: '#838383',
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    chart.subscribeCrosshairMove(param => {
        if (param.time && param.seriesData.size > 0) {
            const data = param.seriesData.get(candlestickSeries);
            setOhlc(data);
        } else if (data.length > 0) {
            setOhlc(data[data.length - 1]);
        }
    });

    const handleResize = () => {
        if (chartContainerRef.current) {
            chart.applyOptions({ 
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
            });
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
    };
  }, []); // Empty dependency array ensures this runs only once

  // --- DATA APPLY EFFECT ---
  useEffect(() => {
    if (data.length > 0 && seriesRef.current && chartRef.current) {
        seriesRef.current.setData(data);
        chartRef.current.timeScale().fitContent();
        const lastDataItem = data[data.length - 1];
        setLastPrice(lastDataItem.close);
        setOhlc(lastDataItem);
    }
  }, [data]);

  // --- CROSSHAIR MODE EFFECT ---
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({
        crosshair: {
            mode: selectedTool === 'crosshair' 
                ? LightweightCharts.CrosshairMode.Normal 
                : LightweightCharts.CrosshairMode.Hidden,
        }
    });
  }, [selectedTool]);

  // --- FULLSCREEN LOGIC ---
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      mainContainerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);

  // --- OHLC Display Logic ---
  const displayData = ohlc || data[data.length - 1] || {};
  const change = displayData.close - displayData.open;
  const changePercent = (change / (displayData.open || 1)) * 100; // Avoid divide by zero
  const isUp = change >= 0;

  return (
    // Added ref for fullscreen
    <div ref={mainContainerRef} className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-2 md:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* SEARCH BUTTON */}
          <button 
            onClick={() => setIsSearchOpen(true)} 
            className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors"
          >
            <Search size={16} className="text-gray-500" />
            <span className="font-medium text-gray-700">{stock}</span>
          </button>
          
          <div className="flex items-center gap-2 text-sm">
            {/* DRAWING TOOL TOGGLE */}
            <button 
              onClick={() => setIsDrawingToolbarOpen(!isDrawingToolbarOpen)}
              className={`p-2 md:px-3 md:py-1 rounded transition-colors ${
                isDrawingToolbarOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
              title="Toggle Drawing Tools"
            >
              <PenTool size={16} />
            </button>

            {/* COMPARE/ADD BUTTON */}
            <button 
              onClick={() => setIsCompareOpen(true)}
              className="p-2 md:px-3 md:py-1 rounded hover:bg-gray-100 transition-colors"
              title="Compare or Add Symbol"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* TIMEFRAME BUTTONS (Desktop) */}
          <div className="hidden md:flex items-center gap-1 border-l pl-4">
            {timeframeOptions.map((tf) => (
              <button 
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-sm font-medium rounded ${
                  timeframe === tf 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-100'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* TIMEFRAME BUTTON (Mobile) */}
          <div className="md:hidden border-l pl-2 relative">
            <button 
              onClick={() => setIsMobileTimeframeOpen(!isMobileTimeframeOpen)}
              className="px-2 py-1 text-sm font-medium hover:bg-gray-100 rounded flex items-center gap-1"
            >
              {timeframe} <ChevronDown size={14} />
            </button>
            {isMobileTimeframeOpen && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-20">
                {timeframeOptions.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setTimeframe(tf);
                      setIsMobileTimeframeOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      timeframe === tf 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-100'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* INDICATORS BUTTON */}
          <button onClick={() => setIsIndicatorOpen(true)} className="p-2 hover:bg-gray-100 rounded" title="Indicators">
            <TrendingUp size={16} />
          </button>
          {/* FULLSCREEN BUTTON */}
          <button onClick={toggleFullScreen} className="p-2 hover:bg-gray-100 rounded" title="Fullscreen">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        {/* Toggles based on isDrawingToolbarOpen state */}
        {isDrawingToolbarOpen && (
          <div className="hidden md:flex w-14 bg-white border-r border-gray-200 flex-col items-center py-4 gap-2">
            <button 
              className={`p-2 rounded transition-colors ${selectedTool === 'cursor' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Cursor"
              onClick={() => setSelectedTool('cursor')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            </button>
            <button 
              className={`p-2 rounded transition-colors ${selectedTool === 'crosshair' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Crosshair"
              onClick={() => setSelectedTool('crosshair')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
            {/* ... Other tools ... */}
          </div>
        )}

        {/* Chart Area */}
        <div className="flex-1 relative bg-white">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <span className="text-gray-500 font-medium">Loading chart data...</span>
            </div>
          )}
          <div ref={chartContainerRef} className="w-full h-full" />
          
          {lastPrice && !isLoading && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded font-medium text-sm shadow-lg">
              {formatPrice(lastPrice)}
            </div>
          )}
          
          {/* ... Bottom Controls ... */}
        </div>

        {/* MODALS (Overlays) */}
        {isSearchOpen && (
          <FeatureModal title="Search & Add Stock" onClose={() => setIsSearchOpen(false)}>
            <input 
              type="text" 
              placeholder="E.g. RELIANCE, TATASTEEL..." 
              className="w-full p-2 border rounded"
              // Add onChange and onKeyDown to handle search
            />
            {/* Add search results list here */}
          </FeatureModal>
        )}
        {isCompareOpen && (
          <FeatureModal title="Compare Stock" onClose={() => setIsCompareOpen(false)}>
            <input 
              type="text" 
              placeholder="Compare with... E.g. NIFTY 50" 
              className="w-full p-2 border rounded"
            />
            {/* Add search results list here */}
          </FeatureModal>
        )}
        {isIndicatorOpen && (
          <FeatureModal title="Add Indicator" onClose={() => setIsIndicatorOpen(false)}>
            <input 
              type="text" 
              placeholder="Search indicators... E.g. RSI, MACD" 
              className="w-full p-2 border rounded"
            />
            {/* Add indicator list here */}
          </FeatureModal>
        )}
      </div>

      {/* Bottom Info Bar (unchanged) */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 text-xs text-gray-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
        {!isLoading && displayData.open ? (
          <>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>O: <span className="font-medium text-gray-800">{formatPrice(displayData.open)}</span></span>
              <span>H: <span className="font-medium text-gray-800">{formatPrice(displayData.high)}</span></span>
              <span>L: <span className="font-medium text-gray-800">{formatPrice(displayData.low)}</span></span>
              <span>C: <span className="font-medium text-gray-800">{formatPrice(displayData.close)}</span></span>
              <span className={isUp ? 'text-green-600' : 'text-red-500'}>
                {isUp ? '▲' : '▼'} {formatPrice(change)} ({isUp ? '+' : ''}{changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-gray-500 font-medium w-full md:w-auto text-left md:text-right">
              {formatDate(displayData.time)}
            </div>
          </>
        ) : (
          <div className="text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default StockChart;
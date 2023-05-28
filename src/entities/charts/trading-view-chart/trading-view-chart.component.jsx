import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const TradingViewWidget = ({ width, height, symbol }) => {
  let tvScriptLoadingPromise;

  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise(resolve => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById('tradingview_6ba8f') &&
        'TradingView' in window
      ) {
        new window.TradingView.widget({
          width,
          height,
          symbol: `${symbol}USDT`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          container_id: 'tradingview_6ba8f'
        });
      }
    }
  }, []);

  return (
    <div className='tradingview-widget-container' style={{ marginTop: '25px' }}>
      <div id='tradingview_6ba8f' />
      <div className='tradingview-widget-copyright'>
        <a
          href={`https://www.tradingview.com/symbols/${symbol}USDT/?exchange=BINANCE`}
          rel='noopener noreferrer'
          target='_blank'
        >
          <span className='blue-text'>{symbol}USDT chart</span>
        </a>{' '}
        by TradingView
      </div>
    </div>
  );
};

TradingViewWidget.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  symbol: PropTypes.string
};

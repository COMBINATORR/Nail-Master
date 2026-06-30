import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneIcon, WhatsAppIcon } from './Icons';

const bgCard = 'bg-[var(--bg-card)]';
const bgAlt = 'bg-[var(--bg-alt)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';
const borderSubtle = 'border-[var(--border-subtle)]';

export const LocationMap = ({
  theme,
  isNightTheme,
  leafletLoaded
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ru';
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.L) return;
    const L = window.L;

    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const mapNode = document.getElementById('studio-map');
      if (!mapNode) return;

      // Clear any pre-existing Leaflet instance on this DOM node to avoid "Map container is already initialized" crash
      if (mapNode._leaflet_id) {
        const parent = mapNode.parentNode;
        if (parent) {
          const newMapNode = document.createElement('div');
          newMapNode.id = 'studio-map';
          newMapNode.className = 'w-full h-full';
          parent.replaceChild(newMapNode, mapNode);
        }
      }

      const map = L.map('studio-map', {
        center: [47.092838, 51.920108],
        zoom: 17,
        zoomControl: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        maxZoom: 20
      }).addTo(map);

      const customIcon = L.divIcon({
        className: 'map-custom-marker',
        html: `
          <div class="marker-pulse-wrapper">
            <div class="marker-pulse"></div>
            <div class="marker-dot"></div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([47.092838, 51.920108], { icon: customIcon }).addTo(map);

      const popupTexts = {
        ru: '<b>Shade Studio</b><br/>Проспект Азаттык 93',
        kk: '<b>Shade Studio</b><br/>Азаттық даңғылы 93',
        en: '<b>Shade Studio</b><br/>93 Azattyk Avenue'
      };
      marker.bindPopup(popupTexts[lang] || popupTexts['ru']).openPopup();
    } catch (error) {
      console.error('Leaflet Map Initialization Error:', error);
    }

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      } catch (error) {
        console.error('Leaflet Cleanup Error:', error);
      }
    };
  }, [theme, lang, isNightTheme, leafletLoaded]);

  return (
    <section id="location" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-3`}>
          {t('findUs')}
        </h2>
        <p className={`${textSecondary} text-sm mb-8`}>
          {t('findUsDesc')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Interactive Custom Leaflet Map Container */}
          <div className={`lg:col-span-2 rounded-2xl overflow-hidden border ${border} shadow-xl z-0 relative`} style={{height: '380px'}}>
            <div id="studio-map" className="w-full h-full"></div>
          </div>

          {/* Info card — 1/3 width */}
          <div className="flex flex-col gap-4">
            {/* Address */}
            <div className={`${bgCard} border ${border} rounded-2xl p-5 flex-1`}>
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-bronze-500/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-bronze-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-display font-bold text-xs uppercase tracking-wider ${textPrimary} mb-1`}>
                    {t('addressLabel')}
                  </p>
                  <p className={`${textSecondary} text-sm leading-relaxed`}>
                    {t('addressValue')}
                  </p>
                  <p className={`${textMuted} text-xs mt-1`}>Атырау, 60011/E01Y0B0</p>
                </div>
              </div>

              <div className={`border-t ${borderSubtle} pt-4 flex items-start gap-3 mb-4`}>
                <div className="bg-bronze-500/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-bronze-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-display font-bold text-xs uppercase tracking-wider ${textPrimary} mb-1`}>
                    {t('workingHoursLabel')}
                  </p>
                  <p className={`${textSecondary} text-sm`}>
                    {t('workingHoursValue')}
                  </p>
                  <p className={`${textMuted} text-xs mt-0.5`}>
                    {t('byAppointmentOnly')}
                  </p>
                </div>
              </div>

              <div className={`border-t ${borderSubtle} pt-4 flex items-start gap-3`}>
                <div className="bg-bronze-500/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                  <PhoneIcon className="w-4 h-4 text-bronze-500" />
                </div>
                <div>
                  <p className={`font-display font-bold text-xs uppercase tracking-wider ${textPrimary} mb-1`}>
                    {t('phoneOrWhatsApp')}
                  </p>
                  <a href="tel:+77016698086" className="text-bronze-400 hover:text-bronze-300 text-sm font-bold transition-colors">
                    +7 701 669 8086
                  </a>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <a
              href="https://2gis.kz/atyrau/search/Shade%20%D0%90%D0%B7%D0%B0%D1%82%D1%82%D1%8B%D0%BA%2093"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 btn-premium-tactile py-3.5 px-5 rounded-xl text-xs uppercase transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              {t('openIn2Gis')}
            </a>

            <a
              href="https://wa.me/77016698086?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9A%D0%B0%D0%BA%20%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BC%D0%B0%D0%BD%D0%B8%D0%BA%D1%8E%D1%80%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-bold py-3.5 px-5 rounded-xl text-xs tracking-wider uppercase transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t('askRoute')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

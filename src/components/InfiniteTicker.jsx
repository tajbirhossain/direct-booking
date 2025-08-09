import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function InfiniteTicker() {
  const { t } = useTranslation()

  const itemsData = t('cards.second.tickers', { returnObjects: true })
  const items = useMemo(
    () => itemsData, []
  );
  

  const scrollingItems = [...items, ...items];

  return (
    <div className="w-full h-full overflow-hidden whitespace-nowrap flex items-center">
      <div className="inline-flex animate-scroll">
        {scrollingItems.map((label, i) => (
          <span key={i} className="mx-10 text-xl max-[1150px]:text-base">
            {label}
          </span>
        ))}
      </div>

      <style jsx>
        {`
                    @keyframes scroll {
                      0% {
                        transform: translateX(0);
                      }
                      100% {
                        transform: translateX(-50%);
                      }
                    }
                    .animate-scroll {
                      display: inline-flex;
                      /* 
                        duration: adjust for speed (e.g. 20s = slower, 10s = faster)
                        linear: constant speed
                        infinite: repeat forever
                      */
                      animation: scroll 25s linear infinite;
                    }
                `}
      </style>
    </div>
  );
}

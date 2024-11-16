import { GITHUB_LINK, ONCHAINKIT_LINK } from 'src/links';
import { ExternalLinkSvg } from 'src/svg/ExternalLinkSvg';

export default function OnchainStoreSummary() {
  return (
    <div className="flex flex-col justify-center border-gray-200 border-b p-4 py-8 pb-22 md:w-1/3 md:border-r md:border-b-0 md:py-4 lg:border-r lg:p-6 lg:pb-22">
      <div className="space-y-4 text-left">
        <h2
          className="font-bold text-3xl leading-tight"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontStretch: 'condensed',
          }}
        >
          Unlock Insights for Smarter Borrowing Decisions
        </h2>
        <p className="text-sm leading-relaxed">
          Enjoy 3 free score checks and subscribe to gain unlimited insights and exclusive access 
          to our dashboard.
        </p>
        <div className="space-y-2">
          <p className="text-sm leading-relaxed font-bold">Subscription Plans:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Silver: 30 days of access to Onchain Credit Score</li>
            <li>Gold: 6 Month access to Onchain Credit Score</li>
            <li>Platinum: 1 Year access to Onchain Credit Score</li>
          </ul>
        </div>
        <div className="flex flex-col pt-6">
          <p className="pt-2 pb-2 font-bold text-sm leading-relaxed">
            BUILD YOUR ONCHAIN SCORE PORTAL
          </p>
          <a
            href={ONCHAINKIT_LINK}
            className="flex cursor-pointer items-center pt-1"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-sm leading-relaxed">VIEW DOCS</p>
            <span className="pl-1">
              <ExternalLinkSvg />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

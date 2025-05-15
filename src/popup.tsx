import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-p-4 plasmo-w-96 plasmo-bg-white">
      {/* Title Section */}
      <div className="plasmo-text-center plasmo-mb-4">
        <h1 className="plasmo-text-2xl plasmo-font-bold plasmo-text-gray-800">One Drop Helper</h1>
        <p className="plasmo-text-sm plasmo-text-gray-600">A gentle tap, bridging the news and web3.</p>
      </div>

      {/* Instructions List */}
      <div className="plasmo-space-y-3">
        <div className="plasmo-flex plasmo-items-start plasmo-gap-3 plasmo-p-3 plasmo-bg-gray-50 plasmo-rounded-lg">
          <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-8 plasmo-h-8 plasmo-bg-blue-100 plasmo-rounded-full">
            <span className="plasmo-text-blue-600">1</span>
          </div>
          <div>
            <h3 className="plasmo-font-medium plasmo-text-gray-800">Login to OneDrop</h3>
            <p className="plasmo-text-sm plasmo-text-gray-600">
              <a
                href="https://www.onedrop.app/platform/login"
                onClick={(e) => {
                  e.preventDefault()
                  window.open("https://www.onedrop.app/platform/login", "_blank")
                }}
                className="plasmo-text-blue-600 plasmo-hover:text-blue-800 plasmo-underline plasmo-cursor-pointer"
              >
                https://www.onedrop.app/platform/login
              </a>
            </p>
          </div>
        </div>

        <div className="plasmo-flex plasmo-items-start plasmo-gap-3 plasmo-p-3 plasmo-bg-gray-50 plasmo-rounded-lg">
          <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-8 plasmo-h-8 plasmo-bg-green-100 plasmo-rounded-full">
            <span className="plasmo-text-green-600">2</span>
          </div>
          <div>
            <h3 className="plasmo-font-medium plasmo-text-gray-800">Fund Your Wallet</h3>
            <p className="plasmo-text-sm plasmo-text-gray-600">Top up SOLANA to your deployment wallet</p>
          </div>
        </div>

        <div className="plasmo-flex plasmo-items-start plasmo-gap-3 plasmo-p-3 plasmo-bg-gray-50 plasmo-rounded-lg">
          <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-8 plasmo-h-8 plasmo-bg-purple-100 plasmo-rounded-full">
            <span className="plasmo-text-purple-600">3</span>
          </div>
          <div>
            <h3 className="plasmo-font-medium plasmo-text-gray-800">Configure Settings</h3>
            <p className="plasmo-text-sm plasmo-text-gray-600">Set your default purchase amount</p>
          </div>
        </div>

        <div className="plasmo-flex plasmo-items-start plasmo-gap-3 plasmo-p-3 plasmo-bg-gray-50 plasmo-rounded-lg">
          <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-8 plasmo-h-8 plasmo-bg-orange-100 plasmo-rounded-full">
            <span className="plasmo-text-orange-600">4</span>
          </div>
          <div>
            <h3 className="plasmo-font-medium plasmo-text-gray-800">Start Drop</h3>
            <p className="plasmo-text-sm plasmo-text-gray-600">Return to Twitter and use AI Quick Drop</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup

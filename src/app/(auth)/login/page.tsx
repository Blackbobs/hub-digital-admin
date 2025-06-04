import React from 'react'

const page: React.FC = () => {
  return (
   <section>
      <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    >
      <div className="layout-container flex h-full grow flex-col max-w-[800px] w-full mx-auto">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome HubDigital</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  placeholder="Username"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#663399] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  placeholder="Password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#663399] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
              <p className="text-[#111418] text-base font-normal leading-normal flex-1 truncate">Remember me</p>
              <div className="shrink-0">
                <div className="flex size-7 items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-[#dbe0e6] border-2 bg-transparent text-[#663399] checked:bg-[#663399] checked:border-[#663399] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#dbe0e6] focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#663399] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Log in</span>
              </button>
            </div>
            <p className="text-[#663399] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">Forgot password?</p>
          </div>
        </div>
      </div>
    </div>
   </section>
  )
}

export default page
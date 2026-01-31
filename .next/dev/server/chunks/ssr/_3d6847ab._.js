module.exports = [
"[project]/app/home/why-bfriends/WhyBFriends.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "contentOverlay": "WhyBFriends-module__ZT0-hG__contentOverlay",
  "fadeIn": "WhyBFriends-module__ZT0-hG__fadeIn",
  "fadeInScale": "WhyBFriends-module__ZT0-hG__fadeInScale",
  "fadeOut": "WhyBFriends-module__ZT0-hG__fadeOut",
  "headingEmphasis": "WhyBFriends-module__ZT0-hG__headingEmphasis",
  "headingText": "WhyBFriends-module__ZT0-hG__headingText",
  "image": "WhyBFriends-module__ZT0-hG__image",
  "imageContainer": "WhyBFriends-module__ZT0-hG__imageContainer",
  "imageFadeIn": "WhyBFriends-module__ZT0-hG__imageFadeIn",
  "imageFadeOut": "WhyBFriends-module__ZT0-hG__imageFadeOut",
  "imageOverlay": "WhyBFriends-module__ZT0-hG__imageOverlay",
  "imageVisible": "WhyBFriends-module__ZT0-hG__imageVisible",
  "imageWrapper": "WhyBFriends-module__ZT0-hG__imageWrapper",
  "mainHeading": "WhyBFriends-module__ZT0-hG__mainHeading",
  "pointDetails": "WhyBFriends-module__ZT0-hG__pointDetails",
  "pointItem": "WhyBFriends-module__ZT0-hG__pointItem",
  "pointItemSelected": "WhyBFriends-module__ZT0-hG__pointItemSelected",
  "pointNumber": "WhyBFriends-module__ZT0-hG__pointNumber",
  "pointText": "WhyBFriends-module__ZT0-hG__pointText",
  "pointTitle": "WhyBFriends-module__ZT0-hG__pointTitle",
  "pointsContainer": "WhyBFriends-module__ZT0-hG__pointsContainer",
  "pointsRow": "WhyBFriends-module__ZT0-hG__pointsRow",
  "pointsSection": "WhyBFriends-module__ZT0-hG__pointsSection",
  "section": "WhyBFriends-module__ZT0-hG__section",
  "slideUp": "WhyBFriends-module__ZT0-hG__slideUp",
  "subHeading": "WhyBFriends-module__ZT0-hG__subHeading",
  "subpoint": "WhyBFriends-module__ZT0-hG__subpoint",
});
}),
"[project]/lib/whybfriends-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "whyBFriendsData",
    ()=>whyBFriendsData
]);
const whyBFriendsData = [
    {
        id: 1,
        point: "Advanced Scans",
        subpoint: "Personalized FRIEND Flow",
        image: "/images/main-sess-1.jpg.jpeg"
    },
    {
        id: 2,
        point: "Journey Partner Support",
        subpoint: "Guided - Measured - Follow Through",
        image: "/images/yoga-sess-2.jpg.jpeg"
    },
    {
        id: 3,
        point: "All-In-One Wellness, One Building",
        subpoint: "Fitness - Cafe - Spa - Yoga - Climbing",
        image: "/images/venue/Gym-1.png"
    },
    {
        id: 4,
        point: "K-Standard Expert Team",
        subpoint: "Training - Protocols - Consistency",
        image: "/images/venue/Spa-1.png"
    },
    {
        id: 5,
        point: "Exclusive Signature Formulas",
        subpoint: "Daewoong Body Oil - Easydew Skincare",
        image: "/images/venue/Gym-2.jpg"
    },
    {
        id: 6,
        point: "Clinic-Grade Clean",
        subpoint: "Purified Water - Strict Hygiene Standards",
        image: "/images/venue/Spa-2.png"
    }
];
}),
"[project]/app/home/why-bfriends/WhyBFriends.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WhyBFriends
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/home/why-bfriends/WhyBFriends.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whybfriends$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/whybfriends-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function WhyBFriends() {
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [prevId, setPrevId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedData = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whybfriends$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["whyBFriendsData"].find((item)=>item.id === selectedId) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whybfriends$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["whyBFriendsData"][0];
    const prevData = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whybfriends$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["whyBFriendsData"].find((item)=>item.id === prevId) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whybfriends$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["whyBFriendsData"][0];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedId !== prevId) {
            setIsTransitioning(true);
            const timer = setTimeout(()=>{
                setPrevId(selectedId);
                setIsTransitioning(false);
            }, 400); // Match animation duration
            return ()=>clearTimeout(timer);
        }
    }, [
        selectedId,
        prevId
    ]);
    const formatId = (id)=>{
        return `${id.toString().padStart(2, "0")}.`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageWrapper,
                        children: [
                            prevId !== selectedId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: prevData.image,
                                alt: prevData.point,
                                fill: true,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].image} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageFadeOut}`,
                                sizes: "100vw"
                            }, void 0, false, {
                                fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: selectedData.image,
                                alt: selectedData.point,
                                fill: true,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].image} ${prevId !== selectedId ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageFadeIn : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageVisible}`,
                                priority: selectedId === 1,
                                sizes: "100vw"
                            }, void 0, false, {
                                fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageOverlay
                            }, void 0, false, {
                                fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentOverlay,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainHeading,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].headingText,
                                        children: "Why "
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].headingEmphasis,
                                        children: "BFriend"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].headingText,
                                        children: " Exists?"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subHeading,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointDetails,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointText,
                                            children: [
                                                selectedData.point,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 70
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subpoint,
                                            children: selectedData.subpoint
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, selectedId, true, {
                                    fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointsSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointsContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointsRow,
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whybfriends$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["whyBFriendsData"].slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointItem} ${selectedId === item.id ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointItemSelected : ""}`,
                                    onClick: ()=>setSelectedId(item.id),
                                    children: [
                                        selectedId === item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointNumber,
                                            children: formatId(item.id)
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                            lineNumber: 83,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointTitle,
                                            children: item.point
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                            lineNumber: 85,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointsRow,
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whybfriends$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["whyBFriendsData"].slice(3, 6).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointItem} ${selectedId === item.id ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointItemSelected : ""}`,
                                    onClick: ()=>setSelectedId(item.id),
                                    children: [
                                        selectedId === item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointNumber,
                                            children: formatId(item.id)
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$home$2f$why$2d$bfriends$2f$WhyBFriends$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pointTitle,
                                            children: item.point
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/why-bfriends/WhyBFriends.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_3d6847ab._.js.map
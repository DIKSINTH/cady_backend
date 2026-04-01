import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// --- Routes ---
import AboutUsRoutes from "./routes/AboutUs.js";
import AdminCheckRoutes from "./routes/AdminCheck.js";
import LogosRoutes from "./routes/Logos.js";
import ContactUsRoutes from "./routes/ContactUs.js";
import BlogsRoutes from "./routes/Blogs.js";
import BlogContentRoutes from "./routes/BlogContent.js";
import WebDesignRoutes from "./routes/WebDesign.js";
import WebDevelopmentRoutes from "./routes/WebDevelopment.js";
import WebMaintenanceRoutes from "./routes/WebMaintenance.js";
import AndroidDevelopmentRoutes from "./routes/AndroidDevelopment.js";
import IosDevelopmentRoutes from "./routes/IosDevelopment.js";
import CrossPlatformRoutes from "./routes/CrossPlatform.js";
import LogoDesignRoutes from "./routes/LogoDesign.js";
import VisitingCardRoutes from "./routes/VisitingCard.js";
import BannersRoutes from "./routes/Banners.js";
import TestimonialRoutes from "./routes/Testimonials.js";
import TestimonialContentRoutes from "./routes/TestimonialContent.js";
import ReviewsRoutes from "./routes/Reviews.js";
import ServicesRoutes from "./routes/Services.js";
import WhyChooseUsRoutes from "./routes/WhyChooseUs.js";
import HowWeWorksRoutes from "./routes/HowWeWorks.js";
import FactsRoutes from "./routes/Facts.js";
import SettingsRoutes from "./routes/Settings.js";
import FooterRoutes from "./routes/Footer.js";

// --- Frontend Fetch Routes ---
import SlidesRoutes from "./routes/Slides.js";
import AboutUsContentRoutes from "./routes/AboutUsContent.js";
import ServicesListsRoutes from "./routes/ServicesList.js";
import WhyChooseUsListRoutes from "./routes/WhyChooseUsLists.js";
import HowWeWorksListRoutes from "./routes/HowWeWorksList.js";
import FactListsRoutes from "./routes/FactLists.js";
import BlogListsRoutes from "./routes/BlogLists.js";
import FooterDataRoutes from "./routes/FooterList.js";
import WelcomeAboutUsRoutes from "./routes/WelcomeAboutUs.js";
import OurValuesRoutes from "./routes/OurValues.js";
import LogoSlideRoutes from "./routes/LogoSlide.js";
import WelcomeWebDesignRoutes from "./routes/WelcomeWebDesign.js";
import DesignListsRoutes from "./routes/DesignLists.js";
import OurDesignProcessRoutes from "./routes/OurDesignProcess.js";
import WebDesignEndRoutes from "./routes/WebDesignEnd.js";
import WelcomeWebDevelopmentRoutes from "./routes/WelcomeWebDevelopment.js";
import WebDevelopmentDesignListsRoutes from "./routes/WebDevelopmentDesignLists.js";
import WebDevelopmentDesignProcessRoutes from "./routes/WebDevelopmentDesignProcess.js";
import WebDevelopmentEndRoutes from "./routes/WebDevelopmentEnd.js";
import WelcomeWebMaintenanceRoutes from "./routes/WelcomeWebMaintenance.js";
import WebMaintenanceDesignListsRoutes from "./routes/WebMaintenanceDesignLists.js";
import WebMaintenanceDesignProcessRoutes from "./routes/WebMaintenanceOurDesignProcess.js";
import WebMaintenanceEndRoutes from "./routes/WebMaintenanceEnd.js";
import WelcomeAndroidRoutes from "./routes/WelcomeAndroid.js";
import AndroidTermsRoutes from "./routes/AndroidTerms.js";
import WhyAndroidRoutes from "./routes/WhyAndroid.js";
import AndroidServicesRoutes from "./routes/AndroidServices.js";
import WelcomeIosRoutes from "./routes/WelcomeIos.js";
import IosTermsRoutes from "./routes/IosTerms.js";
import IosServicesRoutes from "./routes/IosServices.js";
import WhyIosRoutes from "./routes/WhyIos.js";
import WelcomeCrossPlatformRoutes from "./routes/WelcomeCrossPlatform.js";
import CrossPlatformTermsRoutes from "./routes/CrossPlatformTerms.js";
import WhyCrossPlatformRoutes from "./routes/WhyCrossPlatform.js";
import CrossPlatformServicesRoutes from "./routes/CrossPlatformServices.js";
import WelcomeLogoDesignRoutes from "./routes/WelcomeLogoDesign.js";
import LogoDesignProcessRoutes from "./routes/LogoDesignProcess.js";
import LogoDesignReasonsRoutes from "./routes/LogoDesignWhyChooseUs.js";
import LogoProcessRoutes from "./routes/LogoDesignOurProcess.js";
import LogoDesignEndRoutes from "./routes/LogoDesignEnd.js";
import WelcomeVisitingCardRoutes from "./routes/WelcomeVisitingCard.js";
import VisitingCardWhyChooseUsRoutes from "./routes/WhyChooseUsVisitingCard.js";
import VisitingCardDesignProcessRoutes from "./routes/VisitingCardDesignProcess.js";
import VisitingCardFeaturesRoutes from "./routes/VisitingCardFeatures.js";
import VisitingCardEndRoutes from "./routes/VisitingCardEnd.js";
import WelcomeBlogRoutes from "./routes/WelcomeBlog.js";
import BlogContentsRoutes from "./routes/BlogPage.js";
import WelcomeTestimonialRoutes from "./routes/WelcomeTestimonials.js";
import TestimonialsSlideRoutes from "./routes/TestimonialsSlide.js";
import WelcomeContactUsRoutes from "./routes/WelcomeContactUs.js";
import ContactMailRoutes from "./routes/ContactMail.js";
import dashboardCounts from "./routes/DashboardCount.js";
import googleReviews from "./routes/GoogleReviews.js";

// --- ES Module __dirname Fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Middlewares ---

app.use(
  cors({
    origin: "*", // or your frontend URL
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Serve Uploaded Files ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ADMIN / CMS ROUTES =================
app.use("/api/login", AdminCheckRoutes);
app.use("/api/aboutus", AboutUsRoutes);
app.use("/api/logos", LogosRoutes);
app.use("/api/contactus", ContactUsRoutes);
app.use("/api/blogs", BlogsRoutes);
app.use("/api/blogcontent", BlogContentRoutes);
app.use("/api/webdesign", WebDesignRoutes);
app.use("/api/webdevelopment", WebDevelopmentRoutes);
app.use("/api/webmaintenance", WebMaintenanceRoutes);
app.use("/api/androiddevelopment", AndroidDevelopmentRoutes);
app.use("/api/iosdevelopment", IosDevelopmentRoutes);
app.use("/api/crossplatform", CrossPlatformRoutes);
app.use("/api/logodesign", LogoDesignRoutes);
app.use("/api/visitingcard", VisitingCardRoutes);
app.use("/api/banners", BannersRoutes);
app.use("/api/testimonials", TestimonialRoutes);
app.use("/api/testimonialcontent", TestimonialContentRoutes);
app.use("/api/reviews", ReviewsRoutes);
app.use("/api/services", ServicesRoutes);
app.use("/api/whychooseus", WhyChooseUsRoutes);
app.use("/api/howweworks", HowWeWorksRoutes);
app.use("/api/facts", FactsRoutes);
app.use("/api/settings", SettingsRoutes);
app.use("/api/footer", FooterRoutes);

// ================= FRONTEND FETCH ROUTES =================
app.use("/api/slides", SlidesRoutes);
app.use("/api/about-content", AboutUsContentRoutes);
app.use("/api/services-list", ServicesListsRoutes);
app.use("/api/why-choose-us-list", WhyChooseUsListRoutes);
app.use("/api/how-we-works-list", HowWeWorksListRoutes);
app.use("/api/fact-lists", FactListsRoutes);
app.use("/api/blog-lists", BlogListsRoutes);
app.use("/api/footer-data", FooterDataRoutes);
app.use("/api/welcome-about-us", WelcomeAboutUsRoutes);
app.use("/api/our-values", OurValuesRoutes);
app.use("/api/logo-slide", LogoSlideRoutes);
app.use("/api/welcome-web-design", WelcomeWebDesignRoutes);
app.use("/api/design-lists", DesignListsRoutes);
app.use("/api/our-design-process", OurDesignProcessRoutes);
app.use("/api/web-design-end", WebDesignEndRoutes);
app.use("/api/welcome-web-development", WelcomeWebDevelopmentRoutes);
app.use("/api/web-development-design-lists", WebDevelopmentDesignListsRoutes);
app.use(
  "/api/web-development-design-process",
  WebDevelopmentDesignProcessRoutes,
);
app.use("/api/web-development-end", WebDevelopmentEndRoutes);
app.use("/api/welcome-web-maintenance", WelcomeWebMaintenanceRoutes);
app.use("/api/web-maintenance-design-lists", WebMaintenanceDesignListsRoutes);
app.use(
  "/api/web-maintenance-design-process",
  WebMaintenanceDesignProcessRoutes,
);
app.use("/api/web-maintenance-end", WebMaintenanceEndRoutes);
app.use("/api/welcome-android", WelcomeAndroidRoutes);
app.use("/api/android-terms", AndroidTermsRoutes);
app.use("/api/why-android", WhyAndroidRoutes);
app.use("/api/android-services", AndroidServicesRoutes);
app.use("/api/welcome-ios", WelcomeIosRoutes);
app.use("/api/ios-terms", IosTermsRoutes);
app.use("/api/ios-services", IosServicesRoutes);
app.use("/api/why-ios", WhyIosRoutes);
app.use("/api/welcome-cross-platform", WelcomeCrossPlatformRoutes);
app.use("/api/cross-platform-terms", CrossPlatformTermsRoutes);
app.use("/api/why-cross-platform", WhyCrossPlatformRoutes);
app.use("/api/cross-platform-services", CrossPlatformServicesRoutes);
app.use("/api/welcome-logo-design", WelcomeLogoDesignRoutes);
app.use("/api/logo-design-process", LogoDesignProcessRoutes);
app.use("/api/logo-design-reasons", LogoDesignReasonsRoutes);
app.use("/api/logo-process", LogoProcessRoutes);
app.use("/api/logo-design-end", LogoDesignEndRoutes);
app.use("/api/welcome-visiting-card", WelcomeVisitingCardRoutes);
app.use("/api/visiting-card-reasons", VisitingCardWhyChooseUsRoutes);
app.use("/api/visiting-card-design-process", VisitingCardDesignProcessRoutes);
app.use("/api/visiting-card-features", VisitingCardFeaturesRoutes);
app.use("/api/visiting-card-end", VisitingCardEndRoutes);
app.use("/api/welcome-blog", WelcomeBlogRoutes);
app.use("/api/blog-contents", BlogContentsRoutes);
app.use("/api/welcome-testimonial", WelcomeTestimonialRoutes);
app.use("/api/testimonials-slide", TestimonialsSlideRoutes);
app.use("/api/welcome-contact-us", WelcomeContactUsRoutes);

app.use("/api/send-contact-mail", ContactMailRoutes);
app.use("/api/dashboard-counts", dashboardCounts);
app.use("/api/google-reviews", googleReviews);
// --- Server Start ---chat
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});

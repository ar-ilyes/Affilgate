export default async function auth({ next, isAuthenticated }) {
  if (isAuthenticated) next();
  else {
    next({ name: "login" });
  }
}

export async function guest({ next, isAuthenticated }) {
  if (isAuthenticated) {
    next({ name: "main" });
  } else next();
}

export async function emailVerified({ to, next, emailVerified }) {

  if (emailVerified) {
    if (to.name === "email-sent" ) {
      return next({ name: "email-confirmed" });
    }
    return next();
  }
  
  if (to.name !== "email-sent") {
    return next({ name: "email-sent" });
  }
  
  return next();
}

// TODO Refactor with team later, need an ENUM for REGISTRATION
export async function onboardingUser({ to, next, company, candidate }) {

  // If user has no company and no candidate, redirect to onboarding-user
  if (!!company && !!candidate) {
    return next({ name: "onboarding-user" });
  }

  // TODO Add logic to not allow access to pages until user has completed onboarding steps

  if(!!company) {
    const currentStep = company.registration_step;    

     // Define routes that are not accessible at different company registration stages
    const restrictedRoutes = {
        '2': ['onboarding-user'],  // After step 2, can't access initial step
        '3': ['onboarding-user'],  // After step 3, can't access initial step
        '4': ['onboarding-user', 'visibility-offer']  // At final step, restrict all previous routes
    };

    // Check if current route is restricted based on registration step
    if (restrictedRoutes[currentStep] && restrictedRoutes[currentStep].includes(to.name)) {
        // Redirect to the appropriate next step
        const redirectRoutes = {
            '2': 'visibility-offer',
            '3': 'visibility-offer',
            '4': 'main' // TODO Redirect to page that comes after onboarding company
        };
        return next({ name: redirectRoutes[currentStep] });
    }

  }

  // Add candidate registration flow restrictions
  if (candidate) {
    
  }
  return next();
}
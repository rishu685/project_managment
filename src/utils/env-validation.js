/**
 * Validates that all required environment variables are present
 * @throws {Error} If any required environment variable is missing
 */
export const validateEnvironmentVariables = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'ACCESS_TOKEN_EXPIRY',
    'REFRESH_TOKEN_EXPIRY'
  ];

  const optionalEnvVars = [
    'PORT',
    'CORS_ORIGIN',
    'CLIENT_SSR_BASE_URL',
    'MAILTRAP_SMTP_HOST',
    'MAILTRAP_SMTP_PORT',
    'MAILTRAP_SMTP_USER',
    'MAILTRAP_SMTP_PASS'
  ];

  const missingRequired = requiredEnvVars.filter(envVar => !process.env[envVar]);
  const missingOptional = optionalEnvVars.filter(envVar => !process.env[envVar]);

  if (missingRequired.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingRequired.forEach(envVar => {
      console.error(`   - ${envVar}`);
    });
    console.error('\n📋 Please check your .env file and ensure all required variables are set.');
    console.error('📄 See .env.example for reference.\n');
    process.exit(1);
  }

  if (missingOptional.length > 0) {
    console.warn('⚠️  Missing optional environment variables:');
    missingOptional.forEach(envVar => {
      console.warn(`   - ${envVar}`);
    });
    console.warn('🔧 These variables have default values but you may want to set them explicitly.\n');
  }

  // Validate JWT secrets are not default values
  if (process.env.ACCESS_TOKEN_SECRET?.includes('your_super_secret') || 
      process.env.REFRESH_TOKEN_SECRET?.includes('your_super_secret')) {
    console.error('❌ JWT secrets are still using default values from .env.example');
    console.error('🔐 Please generate secure, unique secrets for production use.\n');
    process.exit(1);
  }

  // Validate MongoDB URI format
  if (!process.env.MONGODB_URI.startsWith('mongodb://') && !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
    console.error('❌ Invalid MONGODB_URI format. Must start with mongodb:// or mongodb+srv://\n');
    process.exit(1);
  }

  console.log('✅ Environment variables validation passed');
};

/**
 * Logs the current configuration (without sensitive data)
 */
export const logConfiguration = () => {
  console.log('🚀 Server Configuration:');
  console.log(`   📍 Port: ${process.env.PORT || 3000}`);
  console.log(`   🗄️  Database: ${process.env.MONGODB_URI?.replace(/\/\/.*@/, '//***:***@')}`);
  console.log(`   🌐 CORS Origins: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
  console.log(`   📧 Email Host: ${process.env.MAILTRAP_SMTP_HOST || 'Not configured'}`);
  console.log(`   🔗 Client URL: ${process.env.CLIENT_SSR_BASE_URL || 'http://localhost:3000'}`);
  console.log('');
};
using Microsoft.AspNetCore.Mvc;

namespace pet_sitter_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly ILogger<UploadController> _logger;
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public UploadController(ILogger<UploadController> logger, IConfiguration configuration, HttpClient httpClient)
    {
        _logger = logger;
        _configuration = configuration;
        _httpClient = httpClient;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UploadData d)
    {
        try
        {
            var url = _configuration["AWS:ApiGatewayUrl"];
            var httpResponse = await _httpClient.PostAsJsonAsync(url, d);

            var apiGatewayResponse = await httpResponse.Content.ReadFromJsonAsync<ApiGatewayResponse>();
            return Created("/api/Upload", apiGatewayResponse);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Post");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    public class UploadData
    {
        public string? ItemType { get; set; }
        public string? Extension { get; set; }
    }

    public class ApiGatewayResponse
    {
        public string? S3ObjectName { get; set; }
        public string? UploadUrl { get; set; }
    }
}

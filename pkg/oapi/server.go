// Package oapi provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.3.0 DO NOT EDIT.
package oapi

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"path"
	"strings"
	"time"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/labstack/echo/v4"
	"github.com/oapi-codegen/runtime"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

// Authorization defines model for Authorization.
type Authorization struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	UserId       string `json:"user_id"`
}

// User defines model for User.
type User struct {
	AvatarUrl   string    `json:"avatar_url"`
	Biography   string    `json:"biography"`
	Birthdate   time.Time `json:"birthdate"`
	CoverUrl    string    `json:"cover_url"`
	CreatedAt   time.Time `json:"created_at"`
	DisplayName string    `json:"display_name"`

	// Id ID番号
	Id        openapi_types.UUID `json:"id"`
	UpdatedAt time.Time          `json:"updated_at"`

	// Username 名前
	Username string `json:"username"`
}

// RequestEditorFn  is the function signature for the RequestEditor callback function
type RequestEditorFn func(ctx context.Context, req *http.Request) error

// Doer performs HTTP requests.
//
// The standard http.Client implements this interface.
type HttpRequestDoer interface {
	Do(req *http.Request) (*http.Response, error)
}

// Client which conforms to the OpenAPI3 specification for this service.
type Client struct {
	// The endpoint of the server conforming to this interface, with scheme,
	// https://api.deepmap.com for example. This can contain a path relative
	// to the server, such as https://api.deepmap.com/dev-test, and all the
	// paths in the swagger spec will be appended to the server.
	Server string

	// Doer for performing requests, typically a *http.Client with any
	// customized settings, such as certificate chains.
	Client HttpRequestDoer

	// A list of callbacks for modifying requests which are generated before sending over
	// the network.
	RequestEditors []RequestEditorFn
}

// ClientOption allows setting custom parameters during construction
type ClientOption func(*Client) error

// Creates a new Client, with reasonable defaults
func NewClient(server string, opts ...ClientOption) (*Client, error) {
	// create a client with sane default values
	client := Client{
		Server: server,
	}
	// mutate client and add all optional params
	for _, o := range opts {
		if err := o(&client); err != nil {
			return nil, err
		}
	}
	// ensure the server URL always has a trailing slash
	if !strings.HasSuffix(client.Server, "/") {
		client.Server += "/"
	}
	// create httpClient, if not already present
	if client.Client == nil {
		client.Client = &http.Client{}
	}
	return &client, nil
}

// WithHTTPClient allows overriding the default Doer, which is
// automatically created using http.Client. This is useful for tests.
func WithHTTPClient(doer HttpRequestDoer) ClientOption {
	return func(c *Client) error {
		c.Client = doer
		return nil
	}
}

// WithRequestEditorFn allows setting up a callback function, which will be
// called right before sending the request. This can be used to mutate the request.
func WithRequestEditorFn(fn RequestEditorFn) ClientOption {
	return func(c *Client) error {
		c.RequestEditors = append(c.RequestEditors, fn)
		return nil
	}
}

// The interface specification for the client above.
type ClientInterface interface {
	// AuthorizeWithLINE request
	AuthorizeWithLINE(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error)

	// RefreshAuthorization request
	RefreshAuthorization(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error)

	// GetUser request
	GetUser(ctx context.Context, userId string, reqEditors ...RequestEditorFn) (*http.Response, error)
}

func (c *Client) AuthorizeWithLINE(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewAuthorizeWithLINERequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) RefreshAuthorization(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewRefreshAuthorizationRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) GetUser(ctx context.Context, userId string, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewGetUserRequest(c.Server, userId)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

// NewAuthorizeWithLINERequest generates requests for AuthorizeWithLINE
func NewAuthorizeWithLINERequest(server string) (*http.Request, error) {
	var err error

	serverURL, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	operationPath := fmt.Sprintf("/authorize/line")
	if operationPath[0] == '/' {
		operationPath = "." + operationPath
	}

	queryURL, err := serverURL.Parse(operationPath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", queryURL.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewRefreshAuthorizationRequest generates requests for RefreshAuthorization
func NewRefreshAuthorizationRequest(server string) (*http.Request, error) {
	var err error

	serverURL, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	operationPath := fmt.Sprintf("/authorize/refresh")
	if operationPath[0] == '/' {
		operationPath = "." + operationPath
	}

	queryURL, err := serverURL.Parse(operationPath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", queryURL.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewGetUserRequest generates requests for GetUser
func NewGetUserRequest(server string, userId string) (*http.Request, error) {
	var err error

	var pathParam0 string

	pathParam0, err = runtime.StyleParamWithLocation("simple", false, "user_id", runtime.ParamLocationPath, userId)
	if err != nil {
		return nil, err
	}

	serverURL, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	operationPath := fmt.Sprintf("/users/%s", pathParam0)
	if operationPath[0] == '/' {
		operationPath = "." + operationPath
	}

	queryURL, err := serverURL.Parse(operationPath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("GET", queryURL.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

func (c *Client) applyEditors(ctx context.Context, req *http.Request, additionalEditors []RequestEditorFn) error {
	for _, r := range c.RequestEditors {
		if err := r(ctx, req); err != nil {
			return err
		}
	}
	for _, r := range additionalEditors {
		if err := r(ctx, req); err != nil {
			return err
		}
	}
	return nil
}

// ClientWithResponses builds on ClientInterface to offer response payloads
type ClientWithResponses struct {
	ClientInterface
}

// NewClientWithResponses creates a new ClientWithResponses, which wraps
// Client with return type handling
func NewClientWithResponses(server string, opts ...ClientOption) (*ClientWithResponses, error) {
	client, err := NewClient(server, opts...)
	if err != nil {
		return nil, err
	}
	return &ClientWithResponses{client}, nil
}

// WithBaseURL overrides the baseURL.
func WithBaseURL(baseURL string) ClientOption {
	return func(c *Client) error {
		newBaseURL, err := url.Parse(baseURL)
		if err != nil {
			return err
		}
		c.Server = newBaseURL.String()
		return nil
	}
}

// ClientWithResponsesInterface is the interface specification for the client with responses above.
type ClientWithResponsesInterface interface {
	// AuthorizeWithLINEWithResponse request
	AuthorizeWithLINEWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*AuthorizeWithLINEResponse, error)

	// RefreshAuthorizationWithResponse request
	RefreshAuthorizationWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*RefreshAuthorizationResponse, error)

	// GetUserWithResponse request
	GetUserWithResponse(ctx context.Context, userId string, reqEditors ...RequestEditorFn) (*GetUserResponse, error)
}

type AuthorizeWithLINEResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *struct {
		// Code レスポンスコード
		Code int           `json:"code"`
		Data Authorization `json:"data"`

		// Ok 正常に処理を終了したかどうか
		Ok bool `json:"ok"`
	}
}

// Status returns HTTPResponse.Status
func (r AuthorizeWithLINEResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r AuthorizeWithLINEResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type RefreshAuthorizationResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *struct {
		// Code レスポンスコード
		Code int           `json:"code"`
		Data Authorization `json:"data"`

		// Ok 正常に処理を終了したかどうか
		Ok bool `json:"ok"`
	}
}

// Status returns HTTPResponse.Status
func (r RefreshAuthorizationResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r RefreshAuthorizationResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type GetUserResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *struct {
		// Code レスポンスコード
		Code int  `json:"code"`
		Data User `json:"data"`

		// Ok 正常に処理を終了したかどうか
		Ok bool `json:"ok"`
	}
}

// Status returns HTTPResponse.Status
func (r GetUserResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r GetUserResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

// AuthorizeWithLINEWithResponse request returning *AuthorizeWithLINEResponse
func (c *ClientWithResponses) AuthorizeWithLINEWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*AuthorizeWithLINEResponse, error) {
	rsp, err := c.AuthorizeWithLINE(ctx, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParseAuthorizeWithLINEResponse(rsp)
}

// RefreshAuthorizationWithResponse request returning *RefreshAuthorizationResponse
func (c *ClientWithResponses) RefreshAuthorizationWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*RefreshAuthorizationResponse, error) {
	rsp, err := c.RefreshAuthorization(ctx, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParseRefreshAuthorizationResponse(rsp)
}

// GetUserWithResponse request returning *GetUserResponse
func (c *ClientWithResponses) GetUserWithResponse(ctx context.Context, userId string, reqEditors ...RequestEditorFn) (*GetUserResponse, error) {
	rsp, err := c.GetUser(ctx, userId, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParseGetUserResponse(rsp)
}

// ParseAuthorizeWithLINEResponse parses an HTTP response from a AuthorizeWithLINEWithResponse call
func ParseAuthorizeWithLINEResponse(rsp *http.Response) (*AuthorizeWithLINEResponse, error) {
	bodyBytes, err := io.ReadAll(rsp.Body)
	defer func() { _ = rsp.Body.Close() }()
	if err != nil {
		return nil, err
	}

	response := &AuthorizeWithLINEResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		var dest struct {
			// Code レスポンスコード
			Code int           `json:"code"`
			Data Authorization `json:"data"`

			// Ok 正常に処理を終了したかどうか
			Ok bool `json:"ok"`
		}
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON200 = &dest

	}

	return response, nil
}

// ParseRefreshAuthorizationResponse parses an HTTP response from a RefreshAuthorizationWithResponse call
func ParseRefreshAuthorizationResponse(rsp *http.Response) (*RefreshAuthorizationResponse, error) {
	bodyBytes, err := io.ReadAll(rsp.Body)
	defer func() { _ = rsp.Body.Close() }()
	if err != nil {
		return nil, err
	}

	response := &RefreshAuthorizationResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		var dest struct {
			// Code レスポンスコード
			Code int           `json:"code"`
			Data Authorization `json:"data"`

			// Ok 正常に処理を終了したかどうか
			Ok bool `json:"ok"`
		}
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON200 = &dest

	}

	return response, nil
}

// ParseGetUserResponse parses an HTTP response from a GetUserWithResponse call
func ParseGetUserResponse(rsp *http.Response) (*GetUserResponse, error) {
	bodyBytes, err := io.ReadAll(rsp.Body)
	defer func() { _ = rsp.Body.Close() }()
	if err != nil {
		return nil, err
	}

	response := &GetUserResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		var dest struct {
			// Code レスポンスコード
			Code int  `json:"code"`
			Data User `json:"data"`

			// Ok 正常に処理を終了したかどうか
			Ok bool `json:"ok"`
		}
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON200 = &dest

	}

	return response, nil
}

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// LINE でログイン
	// (POST /authorize/line)
	AuthorizeWithLINE(ctx echo.Context) error
	// 認証トークンを更新
	// (POST /authorize/refresh)
	RefreshAuthorization(ctx echo.Context) error
	// ユーザーを取得する
	// (GET /users/{user_id})
	GetUser(ctx echo.Context, userId string) error
}

// ServerInterfaceWrapper converts echo contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

// AuthorizeWithLINE converts echo context to params.
func (w *ServerInterfaceWrapper) AuthorizeWithLINE(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.AuthorizeWithLINE(ctx)
	return err
}

// RefreshAuthorization converts echo context to params.
func (w *ServerInterfaceWrapper) RefreshAuthorization(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.RefreshAuthorization(ctx)
	return err
}

// GetUser converts echo context to params.
func (w *ServerInterfaceWrapper) GetUser(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "user_id" -------------
	var userId string

	err = runtime.BindStyledParameterWithOptions("simple", "user_id", ctx.Param("user_id"), &userId, runtime.BindStyledParameterOptions{ParamLocation: runtime.ParamLocationPath, Explode: false, Required: true})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter user_id: %s", err))
	}

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.GetUser(ctx, userId)
	return err
}

// This is a simple interface which specifies echo.Route addition functions which
// are present on both echo.Echo and echo.Group, since we want to allow using
// either of them for path registration
type EchoRouter interface {
	CONNECT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	DELETE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	HEAD(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	OPTIONS(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PATCH(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	POST(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PUT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	TRACE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

// RegisterHandlers adds each server route to the EchoRouter.
func RegisterHandlers(router EchoRouter, si ServerInterface) {
	RegisterHandlersWithBaseURL(router, si, "")
}

// Registers handlers, and prepends BaseURL to the paths, so that the paths
// can be served under a prefix.
func RegisterHandlersWithBaseURL(router EchoRouter, si ServerInterface, baseURL string) {

	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	router.POST(baseURL+"/authorize/line", wrapper.AuthorizeWithLINE)
	router.POST(baseURL+"/authorize/refresh", wrapper.RefreshAuthorization)
	router.GET(baseURL+"/users/:user_id", wrapper.GetUser)

}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"H4sIAAAAAAAC/+xV32sTSxT+Vy7n3sdtkt77tm8XFCmID4L4UEqY7p4k02ZnxpnZQgx92F2ollJaCraI",
	"iA9K1WqxUH9UKf4zY9r+GTKzaZPNbkWfpOBLsuzZOec73/edM30IeCQ4Q6YV+H1QQQcj4h7/j3WHS3qf",
	"aMqZfSEkFyg1RRcmQYBKNTVfRBfVPYHgg9KSsjYseyCxJVF1fvBFrFA2aVgRc8fvxVRiCP7sxYdesepk",
	"jTnvPA+fX8BA2xp3FMoK8EtEE9mMZbcS2DzlbUlEp3dJVOpOSDTaaIvLiGjwwb6Y0jRC8MpHAr6El5cL",
	"JBKNYdPm+dmMIVWiS3pNRiKsTJrzGqIKJBW5hDBz7fTR3mDjE3ijKnHsiC2LI8JfBmV1OgdUrDzYXB+s",
	"rpfPTAjtoFxkmejSG5dtnNNxwcblKTRRoLnsFIuEshZ3XFLddSCZmiJCgAdLKFXeyHStUWvYXrlARgQF",
	"H/6rNWrT4IEguuPcVSfD0cF6lzLHhuDK8WhN6AZqJgT/YsTwLtWdmzO3rjtLK8GZyn36b6Nh/wLONDKX",
	"gAjRpYFLUV9Q+WDmQ1t2ecDDCilM9takn0321GSH9iE9NNmxyVZH4lCmsY3S2Yxol/gfiS3w4e/6aF3U",
	"h7uiXlwUlprFctWT/eeDoyOTvBk82D3dXDHp1umH9NuXFZPsmOSZSdZM8tokKyZZG+GY57yLhJVcwhed",
	"/KFziAVYLWcRgMuiMIgl1T3wZ+c8UHEUEdkDHyz3f5nkpcn2TXpg0hcmO3QHxqQc7prL1bydf1Ck44+g",
	"v0XQs731s1fHJntoqUjfOWa2Tp68P9k+yHW1S0bV+8ObZdn218YKUW+gdleIHW9JItQoFfizfaAWgx15",
	"8CDfeWPX1Kg5LWP0xgSd3H9zV9EgjpEr6QuT7TpHfHS/W4ON7cHXHZM8NumazbX8PQAA//+rEflPEAkA",
	"AA==",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
